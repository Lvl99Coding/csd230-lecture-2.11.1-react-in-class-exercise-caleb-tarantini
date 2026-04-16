package csd230.controllers;

import csd230.entities.TicketEntity;
import csd230.repositories.TicketRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Ticket REST API", description = "JSON API for managing tickets")
@RestController
@RequestMapping("/api/rest/tickets")
@CrossOrigin(origins = "*")
public class TicketController {
    private final TicketRepository ticketRepository;

    public TicketController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Operation(summary = "Get all tickets as JSON")
    @GetMapping
    public List<TicketEntity> all() {
        return ticketRepository.findAll();
    }

    @Operation(summary = "Get a single ticket by ID")
    @GetMapping("/{id}")
    public TicketEntity getTicket(@PathVariable Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found: " + id));
    }

    @Operation(summary = "Create a new ticket")
    @PostMapping
    public TicketEntity newTicket(@RequestBody TicketEntity newTicket) {
        return ticketRepository.save(newTicket);
    }

    @Operation(summary = "Update or Replace a ticket")
    @PutMapping("/{id}")
    public TicketEntity replaceTicket(@RequestBody TicketEntity newTicket, @PathVariable Long id) {
        return ticketRepository.findById(id)
                .map(ticket -> {
                    ticket.setDescription(newTicket.getDescription());
                    ticket.setPrice(newTicket.getPrice());
                    return ticketRepository.save(ticket);
                })
                .orElseGet(() -> {
                    newTicket.setId(id);
                    return ticketRepository.save(newTicket);
                });
    }

    @Operation(summary = "Delete a ticket")
    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketRepository.deleteById(id);
    }
}
