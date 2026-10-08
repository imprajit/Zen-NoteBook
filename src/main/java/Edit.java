import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;
class Edit {
    static void editNote(Scanner scan) {
        System.out.println("---------- EDIT NOTE ----------");
        System.out.print("Enter note ID: ");
        int id = scan.nextInt();
        scan.nextLine();
        System.out.print("New title: ");
        String title = scan.nextLine();
        System.out.print("New content: ");
        String content = scan.nextLine();
        String sql = """
                UPDATE notes
                SET title = ?, content = ?
                WHERE id = ?
                """;
        try (Connection connection = Database.connect();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, title);
            statement.setString(2, content);
            statement.setInt(3, id);
            int rowsUpdated = statement.executeUpdate();
            if (rowsUpdated > 0) {
                System.out.println("Note updated!");
            } else {
                System.out.println("No note found with that ID.");
            }
        } catch (SQLException e) {
            System.out.println("Could not update note.");
            e.printStackTrace();
        }
    }
}