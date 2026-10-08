import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;
class Create {
    static void createNote(Scanner scan) {
        System.out.println("---------- NEW NOTE ----------");
        System.out.print("Title: ");
        String title = scan.nextLine();
        System.out.print("Content: ");
        String content = scan.nextLine();
        String sql = "INSERT INTO notes (title, content) VALUES (?, ?)";
        try (Connection connection = Database.connect();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, title);
            statement.setString(2, content);
            statement.executeUpdate();
            System.out.println("Note saved!");
        } catch (SQLException e) {
            System.out.println("Could not save note.");
            e.printStackTrace();
        }
    }
}