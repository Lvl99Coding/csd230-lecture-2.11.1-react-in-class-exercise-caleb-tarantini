package csd230.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("TABLET")
public class TabletEntity extends ProductEntity {
    private String brand;
    private Double screenSize;
    private Double price;

    // Getters and setters
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Double getScreenSize() {
        return screenSize;
    }

    public void setScreenSize(Double screenSize) {
        this.screenSize = screenSize;
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

    // Constructors
    public TabletEntity() {}

    public TabletEntity(String brand, Double screenSize, Double price) {
        this.brand = brand;
        this.screenSize = screenSize;
        this.price = price;
    }
}
