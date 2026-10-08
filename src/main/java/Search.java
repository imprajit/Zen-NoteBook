import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;
class Search {
    static void searchNotes(Scanner scan) {
        System.out.println("---------- SEARCH NOTES ----------");
        System.out.print("Search: ");
        String keyword = scan.nextLine();
        String sql = """
                SELECT id, title, content, created_at
                FROM notes
                WHERE title LIKE ? OR content LIKE ?
                """;
        try (Connection connection = Database.connect();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, "%" + keyword + "%");
            statement.setString(2, "%" + keyword + "%");
            try (ResultSet result = statement.executeQuery()) {
                boolean found = false;
                while (result.next()) {
                    found = true;
                    System.out.println();
                    System.out.println("ID: " + result.getInt("id"));
                    System.out.println("Title: " + result.getString("title"));
                    System.out.println("Content: " + result.getString("content"));
                    System.out.println("Created: " + result.getString("created_at"));
                    System.out.println("--------------------------------");
                }
                if (!found) {
                    System.out.println("No notes found.");
                }
            }
        } catch (SQLException e) {
            System.out.println("Could not search notes.");
            e.printStackTrace();
        }
    }
}