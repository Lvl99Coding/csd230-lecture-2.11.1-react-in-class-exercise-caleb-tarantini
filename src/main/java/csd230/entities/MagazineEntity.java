package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity @DiscriminatorValue("MAGAZINE")
public class MagazineEntity extends PublicationEntity {
    private Integer orderQty; // Changed from int to Integer
    private LocalDate currentIssue;
    public MagazineEntity() {}
    public MagazineEntity(String t, Double p, Integer c, Integer o, LocalDate d) { super(t, p, c); this.orderQty = o; this.currentIssue = d; }
    public Integer getOrderQty() { return orderQty; } // Updated return type
    public void setOrderQty(Integer o) { this.orderQty = o; } // Updated parameter type
    public void setCurrentIssue(LocalDate d) { this.currentIssue = d; }
    public LocalDate getCurrentIssue() { return currentIssue; }
    @Override public String toString() { return "Mag{issue=" + currentIssue + ", " + super.toString() + "}"; }
}
