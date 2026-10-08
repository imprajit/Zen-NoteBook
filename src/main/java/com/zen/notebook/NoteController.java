package com.zen.notebook;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@RestController
public class NoteController {

    // =================================
    // CREATE NOTE
    // =================================

    @PostMapping("/api/notes")
    public String createNote(@RequestBody Note note) {

        String sql = """
                INSERT INTO notes
                (title, content, is_favorite, is_deleted)
                VALUES (?, ?, FALSE, FALSE)
                """;

        try (Connection connection = NoteDatabase.connect();
             PreparedStatement statement =
                     connection.prepareStatement(sql)) {

            statement.setString(1, note.getTitle());
            statement.setString(2, note.getContent());

            statement.executeUpdate();

            return "Note saved!";

        } catch (Exception e) {

            e.printStackTrace();

            return "Could not save note.";
        }
    }


    // =================================
    // GET NOTES
    // =================================

    @GetMapping("/api/notes")
    public List<Note> getNotes() {

        List<Note> notes = new ArrayList<>();

        String sql = """
                SELECT id, title, content, is_favorite, is_deleted
                FROM notes
                WHERE is_deleted = FALSE
                ORDER BY id DESC
                """;

        try (Connection connection = NoteDatabase.connect();
             PreparedStatement statement =
                     connection.prepareStatement(sql);
             ResultSet result =
                     statement.executeQuery()) {

            while (result.next()) {

                Note note = new Note();

                note.setId(result.getInt("id"));

                note.setTitle(
                        result.getString("title")
                );

                note.setContent(
                        result.getString("content")
                );

                note.setFavorite(
                        result.getBoolean("is_favorite")
                );

                note.setDeleted(
                        result.getBoolean("is_deleted")
                );

                notes.add(note);
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return notes;
    }


    // =================================
    // EDIT NOTE
    // =================================

    @PutMapping("/api/notes/{id}")
    public String updateNote(
            @PathVariable int id,
            @RequestBody Note note) {

        String sql = """
                UPDATE notes
                SET title = ?, content = ?
                WHERE id = ?
                AND is_deleted = FALSE
                """;

        try (Connection connection = NoteDatabase.connect();
             PreparedStatement statement =
                     connection.prepareStatement(sql)) {

            statement.setString(1, note.getTitle());

            statement.setString(2, note.getContent());

            statement.setInt(3, id);

            int rows =
                    statement.executeUpdate();

            if (rows == 0) {

                return "Note not found.";
            }

            return "Note updated!";

        } catch (Exception e) {

            e.printStackTrace();

            return "Could not update note.";
        }
    }


    // =================================
    // MOVE NOTE TO TRASH
    // =================================

    @DeleteMapping("/api/notes/{id}")
    public String deleteNote(
            @PathVariable int id) {

        String sql = """
                UPDATE notes
                SET is_deleted = TRUE
                WHERE id = ?
                """;

        try (Connection connection = NoteDatabase.connect();
             PreparedStatement statement =
                     connection.prepareStatement(sql)) {

            statement.setInt(1, id);

            int rows =
                    statement.executeUpdate();

            if (rows == 0) {

                return "Note not found.";
            }

            return "Note moved to Trash!";

        } catch (Exception e) {

            e.printStackTrace();

            return "Could not move note to Trash.";
        }
    }


    // =================================
    // GET FAVORITES
    // =================================

    @GetMapping("/api/notes/favorites")
    public List<Note> getFavorites() {

        return getNotesByQuery("""
                SELECT id, title, content, is_favorite, is_deleted
                FROM notes
                WHERE is_favorite = TRUE
                AND is_deleted = FALSE
                ORDER BY id DESC
                """);
    }


    // =================================
    // FAVORITE / UNFAVORITE
    // =================================

    @PutMapping("/api/notes/{id}/favorite")
    public String toggleFavorite(
            @PathVariable int id) {

        String findSql =
                "SELECT is_favorite FROM notes WHERE id = ?";

        String updateSql =
                "UPDATE notes SET is_favorite = ? WHERE id = ?";

        try (Connection connection = NoteDatabase.connect();
             PreparedStatement findStatement =
                     connection.prepareStatement(findSql)) {

            findStatement.setInt(1, id);

            ResultSet result =
                    findStatement.executeQuery();

            if (!result.next()) {

                return "Note not found.";
            }

            boolean current =
                    result.getBoolean("is_favorite");

            boolean newValue = !current;


            try (PreparedStatement updateStatement =
                         connection.prepareStatement(updateSql)) {

                updateStatement.setBoolean(
                        1,
                        newValue
                );

                updateStatement.setInt(
                        2,
                        id
                );

                updateStatement.executeUpdate();
            }

            if (newValue) {

                return "Note added to Favorites!";

            } else {

                return "Note removed from Favorites!";
            }

        } catch (Exception e) {

            e.printStackTrace();

            return "Could not change Favorite.";
        }
    }


    // =================================
    // GET TRASH
    // =================================

    @GetMapping("/api/notes/trash")
    public List<Note> getTrash() {

        return getNotesByQuery("""
                SELECT id, title, content, is_favorite, is_deleted
                FROM notes
                WHERE is_deleted = TRUE
                ORDER BY id DESC
                """);
    }


    // =================================
    // RESTORE FROM TRASH
    // =================================

    @PutMapping("/api/notes/{id}/restore")
    public String restoreNote(
            @PathVariable int id) {

        String sql =
                "UPDATE notes SET is_deleted = FALSE WHERE id = ?";

        try (Connection connection = NoteDatabase.connect();
             PreparedStatement statement =
                     connection.prepareStatement(sql)) {

            statement.setInt(1, id);

            int rows =
                    statement.executeUpdate();

            if (rows == 0) {

                return "Note not found.";
            }

            return "Note restored!";

        } catch (Exception e) {

            e.printStackTrace();

            return "Could not restore note.";
        }
    }


    // =================================
    // PERMANENT DELETE
    // =================================

    @DeleteMapping("/api/notes/{id}/permanent")
    public String permanentlyDeleteNote(
            @PathVariable int id) {

        String sql =
                "DELETE FROM notes WHERE id = ?";

        try (Connection connection = NoteDatabase.connect();
             PreparedStatement statement =
                     connection.prepareStatement(sql)) {

            statement.setInt(1, id);

            int rows =
                    statement.executeUpdate();
            if (rows == 0) {
                return "Note not found.";
            }
            return "Note permanently deleted!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Could not permanently delete note.";
        }
    }
    private List<Note> getNotesByQuery(
            String sql) {
        List<Note> notes =
                new ArrayList<>();
        try (Connection connection =
                     NoteDatabase.connect();
             PreparedStatement statement =
                     connection.prepareStatement(sql);
             ResultSet result =
                     statement.executeQuery()) {
            while (result.next()) {
                Note note =
                        new Note();
                note.setId(
                      result.getInt("id")
                );
                note.setTitle(
                        result.getString("title")
                );
                note.setContent(
                        result.getString("content")
                );
                note.setFavorite(
                        result.getBoolean("is_favorite")
                );
                note.setDeleted(
                        result.getBoolean("is_deleted")
                );
                notes.add(note);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return notes;
    }
}