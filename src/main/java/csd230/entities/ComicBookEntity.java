package csd230.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("COMICBOOK")
public class ComicBookEntity extends PublicationEntity {
    private String genre;

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    private String author;
    // Getters and setters
    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    // Constructors
    public ComicBookEntity() {}

    public ComicBookEntity(String t, String a, Double p, Integer c, String g) {
        super(t, p, c);
        this.author = a;
        this.genre = g;
    }
}
