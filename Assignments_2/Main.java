import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.stream.Collectors;

// 1. Account Entity
class Account {
    private String accountId;
    private String customerName;
    private double balance;

    public Account(String accountId, String customerName, double initialDeposit) {
        this.accountId = accountId;
        this.customerName = customerName;
        this.balance = initialDeposit;
    }

    public String getAccountId() { return accountId; }
    public double getBalance() { return balance; }
    
    public void adjustBalance(double amount) {
        this.balance += amount;
    }

    @Override
    public String toString() {
        return "Account{" + "ID='" + accountId + "', Name='" + customerName + "', Balance=" + balance + '}';
    }
}

// 2. Transaction Entity
class Transaction implements Comparable<Transaction> {
    private String transactionId;
    private String accountId;
    private double amount;
    private long timestamp;

    public Transaction(String transactionId, String accountId, double amount, long timestamp) {
        this.transactionId = transactionId;
        this.accountId = accountId;
        this.amount = amount;
        this.timestamp = timestamp;
    }
    
    public String getAccountId() { return accountId; }

    @Override
    public int compareTo(Transaction other) {
        int timeCompare = Long.compare(this.timestamp, other.timestamp);
        if (timeCompare == 0) {
            return this.transactionId.compareTo(other.transactionId);
        }
        return timeCompare;
    }

    @Override
    public String toString() {
        return "Txn{" + "ID='" + transactionId + "', Acc='" + accountId + "', Amt=" + amount + '}';
    }
}

// 3. The In-Memory Store using Streams
class BankingStore {
    private Map<String, Account> accounts;
    private TreeSet<Transaction> transactions;
    private Deque<String> auditTrail;

    public BankingStore() {
        this.accounts = new HashMap<>();
        this.transactions = new TreeSet<>();
        this.auditTrail = new ArrayDeque<>();
    }

    //Write Operations
    
    public void createAccount(String accountId, String customerName, double initialDeposit) {
        if (!accounts.containsKey(accountId)) {
            accounts.put(accountId, new Account(accountId, customerName, initialDeposit));
            logAudit("Account created: " + accountId);
        }
    }

    public void processTransaction(String txnId, String accountId, double amount) {
        Account acc = accounts.get(accountId);
        if (acc != null) {
            acc.adjustBalance(amount);
            Transaction txn = new Transaction(txnId, accountId, amount, System.currentTimeMillis());
            transactions.add(txn);
            logAudit("Transaction processed: " + txnId + " for amount: " + amount);
        } else {
            logAudit("Failed transaction: Account " + accountId + " not found.");
        }
    }

    private void logAudit(String message) {
        auditTrail.addLast(System.currentTimeMillis() + " - " + message);
    }

    //Stream-Based Read Operations

    public Account getAccountDetails(String accountId) {
        return accounts.get(accountId);
    }

    // Stream 1: Simple iteration using forEach
    public void printAllTransactionsChronologically() {
        System.out.println("--- All Transactions ---");
        transactions.stream().forEach(System.out::println);
    }

    // Stream 2: Filtering and Collecting
    public List<Transaction> getTransactionsForAccount(String accountId) {
        return transactions.stream()
                .filter(txn -> txn.getAccountId().equals(accountId))
                .collect(Collectors.toList());
    }

    // Stream 3: Mapping and Aggregation (Summing)
    public double getTotalBankBalance() {
        return accounts.values().stream()
                .mapToDouble(Account::getBalance)
                .sum();
    }

    // Stream 4: Iterating over Deque
    public void printRecentAudits() {
        System.out.println("--- Audit Trail ---");
        auditTrail.stream().forEach(System.out::println);
    }
}

// 4. Main Class 
public class Main {
    public static void main(String[] args) throws InterruptedException {
        BankingStore store = new BankingStore();

        // Setup Data
        store.createAccount("A100", "Alice", 5000.0);
        store.createAccount("A101", "Bob", 3000.0);

        store.processTransaction("TXN01", "A100", -500.0);
        Thread.sleep(10); 
        store.processTransaction("TXN02", "A101", 1200.0);
        Thread.sleep(10);
        store.processTransaction("TXN03", "A100", 200.0);

        // Test Stream Implementations
        store.printAllTransactionsChronologically();
        
        System.out.println("\n--- Transactions for A100 ---");
        List<Transaction> aliceTxns = store.getTransactionsForAccount("A100");
        aliceTxns.forEach(System.out::println);
        
        System.out.println("\n--- Total Bank Balance ---");
        System.out.println("Total Holdings: $" + store.getTotalBankBalance());
        
        System.out.println();
        store.printRecentAudits();
    }
}
