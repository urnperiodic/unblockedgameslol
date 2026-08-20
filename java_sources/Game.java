package games;

public class Game {
    private String id;
    private String title;
    private String description;
    private String url;
    private String thumbnail;
    private String category;

    // Default constructor
    public Game() {}

    // Convenience constructor
    public Game(String id, String title, String description, String url, String thumbnail, String category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
        this.thumbnail = thumbnail;
        this.category = category;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
