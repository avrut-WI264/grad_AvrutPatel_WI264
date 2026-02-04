import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static Connection con = null;

    private DBConnection() {}

    public static Connection getConnection() {
        if (con == null) {
            try {
                con = DriverManager.getConnection("IP", "DB", "PORT");
            } catch (SQLException e) {
                System.out.println("Connection Error: " + e.getMessage());
            }
        }
        return con;
    }
}