package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("DISCMAG")
public class DiscMagEntity extends MagazineEntity {
    private boolean hasDisc;

    public DiscMagEntity() {}

    public DiscMagEntity(String title, double price, int copies, int orderQuantity, LocalDate currentIssue, boolean hasDisc) {
        super(title, price, copies, orderQuantity, currentIssue);
        this.hasDisc = hasDisc;
    }

    public boolean isHasDisc() {
        return hasDisc;
    }

    public void setHasDisc(boolean hasDisc) {
        this.hasDisc = hasDisc;
    }

    @Override
    public String toString() {
        return "DiscMagEntity{hasDisc=" + hasDisc + "}";
    }
}
