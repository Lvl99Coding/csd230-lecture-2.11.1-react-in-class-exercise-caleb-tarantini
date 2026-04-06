package csd230.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public abstract class GuitarEntity extends ProductEntity {
    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "number_of_strings")
    private int numberOfStrings;

    @Column(name = "guitar_price")
    private double price;

    public GuitarEntity() {
    }

    public GuitarEntity(String brand, String model, int numberOfStrings, double price) {
        this.brand = brand;
        this.model = model;
        this.numberOfStrings = numberOfStrings;
        this.price = price;
    }

    @Override
    public void sellItem(){
        System.out.println("Sold Guitar: '" + brand + " " + model + "' for $" + price);
    }

    @Override
    public String toString() {
        return "Guitar{" +
                "brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", numberOfStrings=" + numberOfStrings +
                ", price=" + price +
                '}';
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getNumberOfStrings() {
        return numberOfStrings;
    }

    public void setNumberOfStrings(int numberOfStrings) {
        this.numberOfStrings = numberOfStrings;
    }

    @Override
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }


}