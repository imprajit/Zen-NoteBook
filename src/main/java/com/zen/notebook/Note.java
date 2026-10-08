package com.zen.notebook;
public class Note {
    private int id;
    private String title;
    private String content;
    private boolean favorite;
    private boolean deleted;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public boolean isFavorite() {
        return favorite;
    }
    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }
    public boolean isDeleted() {
        return deleted;
    }
    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}