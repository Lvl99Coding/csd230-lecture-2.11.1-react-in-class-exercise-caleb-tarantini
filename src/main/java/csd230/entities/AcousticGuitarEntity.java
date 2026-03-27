package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity @DiscriminatorValue("ACOUSTIC_GUITAR")
public class AcousticGuitarEntity extends  GuitarEntity{
    private boolean hasCutaway;

    public AcousticGuitarEntity(){}

    public AcousticGuitarEntity(String brand, String model, int numberOfStrings, boolean hasCutaway, double price) {
        super(brand, model, numberOfStrings, price);
        this.hasCutaway = hasCutaway;
    }

    public boolean getHasCutaway() {
        return hasCutaway;
    }

    public void setHasCutaway(boolean hasCutaway) {
        this.hasCutaway = hasCutaway;
    }

    @Override
    public String toString() {
        return "AcousticGuitar{" +
                super.toString() +
                "hasCutaway=" + hasCutaway +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof AcousticGuitarEntity that)) return false;
        if (!super.equals(o)) return false;
        return getHasCutaway() == that.getHasCutaway();
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(super.hashCode(), getHasCutaway());
    }

}