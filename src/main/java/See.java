import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
class See {
    static void seeNotes() {
        String sql = "SELECT id, title, content, created_at FROM notes";
        try (Connection connection = Database.connect();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet result = statement.executeQuery()) {
            System.out.println();
            System.out.println("========== YOUR NOTES ==========");
            while (result.next()) {
                int id = result.getInt("id");
                String title = result.getString("title");
                String content = result.getString("content");
                String createdAt = result.getString("created_at");
                System.out.println();
                System.out.println("ID: " + id);
                System.out.println("Title: " + title);
                System.out.println("Content: " + content);
                System.out.println("Created: " + createdAt);
                System.out.println("--------------------------------");
            }
        } catch (SQLException e) {
            System.out.println("Could not load notes.");
            e.printStackTrace();
        }
    }
}