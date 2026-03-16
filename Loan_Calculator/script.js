const loanTypes = {
    HOME: { interest: 9, minAmount: 500000, maxDuration: 30 },
    CAR: { interest: 12, minAmount: 100000, maxDuration: 7 },
    PERSONAL: { interest: 15, minAmount: 10000, maxDuration: 5 }
};

const loanForm = document.getElementById('loanForm');
const radioButtons = document.querySelectorAll('input[name="loanType"]');
const interestInput = document.getElementById('interest');
const amountHint = document.getElementById('amount-hint');
const durationHint = document.getElementById('duration-hint');

// Update UI hints and interest based on loan type selection
radioButtons.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const selected = loanTypes[e.target.value];
        interestInput.value = selected.interest + "%";
        amountHint.innerText = `Min: > ${selected.minAmount.toLocaleString()}`;
        durationHint.innerText = `Max: < ${selected.maxDuration} Years`;
    });
});

// Handle Form Submission
loanForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents page reload

    const applicant = document.getElementById('applicant').value;
    const selectedRadio = document.querySelector('input[name="loanType"]:checked');
    const amount = parseFloat(document.getElementById('amount').value);
    const durationYears = parseFloat(document.getElementById('duration').value);
    const resultDiv = document.getElementById('result');

    const typeData = loanTypes[selectedRadio.value];

    // Validation Logic
    if (amount < typeData.minAmount) {
        alert(`Error: ${selectedRadio.value} loan amount must be greater than ${typeData.minAmount}.`);
        return;
    }

    if (durationYears > typeData.maxDuration) {
        alert(`Error: ${selectedRadio.value} duration must be less than ${typeData.maxDuration} years.`);
        return;
    }

    // EMI Calculation
    const P = amount;
    const r = (typeData.interest / 12) / 100; // Monthly interest
    const n = durationYears * 12; // Total months

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    // Display result in the appended div
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <p>Applicant: ${applicant}</p>
        <p>Loan Type: ${selectedRadio.value}</p>
        <p>Monthly EMI: ₹${emi.toFixed(2)}</p>
    `;
});