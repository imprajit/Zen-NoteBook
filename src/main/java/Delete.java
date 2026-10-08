import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;
class Delete {
    static void deleteNote(Scanner scan) {
        System.out.println("---------- DELETE NOTE ----------");
        System.out.print("Enter note ID: ");
        int id = scan.nextInt();
        String sql = "DELETE FROM notes WHERE id = ?";
        try (Connection connection = Database.connect();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            int rowsDeleted = statement.executeUpdate();
            if (rowsDeleted > 0) {
                System.out.println("Note deleted!");
            } else {
                System.out.println("No note found with that ID.");
            }
        } catch (SQLException e) {
            System.out.println("Could not delete note.");
            e.printStackTrace();
        }
    }
}