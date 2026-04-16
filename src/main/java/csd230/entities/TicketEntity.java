package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("TICKET")
public class TicketEntity extends ProductEntity {
    private String description;
    private Double price;

    public TicketEntity() {}

    public TicketEntity(String description, Double price) {
        this.description = description;
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public void sellItem() {

    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "TicketEntity{description='" + description + "', price=" + price + "}";
    }
}
