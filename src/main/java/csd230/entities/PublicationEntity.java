package csd230.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public abstract class PublicationEntity extends ProductEntity {
    private String title;
    @JsonProperty("price")
    @Column(name = "pub_price") private Double price; // Changed from double to Double
    private Integer copies; // Changed from int to Integer
    public PublicationEntity() {}
    public PublicationEntity(String t, Double p, Integer c) { this.title = t; this.price = p; this.copies = c; }

    @Override public void sellItem() {
        if (copies != null && copies > 0) { copies--; System.out.println("Sold '" + title + "'. Remaining copies: " + copies); }
        else { System.out.println("Cannot sell '" + title + "'. Out of stock."); }
    }
    @Override public Double getPrice() { return price; }

    public String getTitle() { return title; }
    public void setTitle(String t) { this.title = t; }
    @JsonProperty("price")
    public void setPrice(Double p) { this.price = p; }
    public Integer getCopies() { return copies; } // Updated return type
    public void setCopies(Integer c) { this.copies = c; } // Updated parameter type
    @Override public String toString() { return "Pub{title='" + title + "', price=" + price + ", copies=" + copies + "}"; }
}
