package com.zen.notebook;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class NoteDatabase {

    public static Connection connect() throws SQLException {

        String url = "jdbc:mysql://localhost:3306/zen_note";
        String username = "root";
        String password = System.getenv("ZEN_DB_PASSWORD");

        return DriverManager.getConnection(url, username, password);
    }
}