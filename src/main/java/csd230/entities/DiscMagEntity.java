package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("DISCMAG")
public class DiscMagEntity extends PublicationEntity {
    private boolean hasDisc;
    private Integer orderQty; // Changed from int to Integer
    private LocalDate currentIssue;

    public DiscMagEntity() {}

    public DiscMagEntity(String title, Double price, Integer copies, Integer orderQuantity, LocalDate currentIssue, boolean hasDisc) {
        super(title, price, copies);
        this.orderQty = orderQuantity;
        this.currentIssue = currentIssue;
        this.hasDisc = hasDisc;

    }

    public Integer getOrderQty() { return orderQty; } // Updated return type
    public void setOrderQty(Integer o) { this.orderQty = o; } // Updated parameter type
    public void setCurrentIssue(LocalDate d) { this.currentIssue = d; }
    public LocalDate getCurrentIssue() { return currentIssue; }

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
