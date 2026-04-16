package csd230.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("COMICBOOK")
public class ComicBookEntity extends BookEntity {
    private String genre;

    // Getters and setters
    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    // Constructors
    public ComicBookEntity() {}

    public ComicBookEntity(String t, String a, double p, int c, String g) {
        super(t, p, c, a);
        this.genre = g;
    }
}
