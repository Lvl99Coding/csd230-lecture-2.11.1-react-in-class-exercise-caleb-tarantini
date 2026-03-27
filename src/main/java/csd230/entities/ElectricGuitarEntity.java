package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity @DiscriminatorValue("ELECTRIC_GUITAR")
public class ElectricGuitarEntity extends GuitarEntity{
    private int numberOfPickups;

    public int getNumberOfPickups() {
        return numberOfPickups;
    }

    public void setNumberOfPickups(int numberOfPickups) {
        this.numberOfPickups = numberOfPickups;
    }

    public ElectricGuitarEntity() {
    }

    public ElectricGuitarEntity(String brand, String model, int numberOfStrings, int numberOfPickups, double price) {
        super(brand, model, numberOfStrings, price);
        this.numberOfPickups = numberOfPickups;
    }

    @Override
    public String toString() {
        return "ElectricGuitar{" +
                super.toString() +
                "numberOfPickups=" + numberOfPickups +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ElectricGuitarEntity that)) return false;
        if (!super.equals(o)) return false;
        return this.getNumberOfPickups() == that.getNumberOfPickups();
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(super.hashCode(), getNumberOfPickups());
    }


}