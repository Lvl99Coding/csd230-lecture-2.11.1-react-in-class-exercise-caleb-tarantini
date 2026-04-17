package csd230.controllers;

import csd230.entities.DiscMagEntity;
import csd230.repositories.DiscMagRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "DiscMag REST API", description = "JSON API for managing disc magazines")
@RestController
@RequestMapping("/api/rest/discmags")
@CrossOrigin(origins = "*")
public class DiscMagController {
    private final DiscMagRepository discMagRepository;

    public DiscMagController(DiscMagRepository discMagRepository) {
        this.discMagRepository = discMagRepository;
    }

    @Operation(summary = "Get all disc magazines as JSON")
    @GetMapping
    public List<DiscMagEntity> all() {
        return discMagRepository.findAll();
    }

    @Operation(summary = "Get a single disc magazine by ID")
    @GetMapping("/{id}")
    public DiscMagEntity getDiscMag(@PathVariable Long id) {
        return discMagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DiscMag not found: " + id));
    }

    @Operation(summary = "Create a new disc magazine")
    @PostMapping
    public DiscMagEntity newDiscMag(@RequestBody DiscMagEntity newDiscMag) {
        return discMagRepository.save(newDiscMag);
    }

    @Operation(summary = "Update or Replace a disc magazine")
    @PutMapping("/{id}")
    public DiscMagEntity replaceDiscMag(@RequestBody DiscMagEntity newDiscMag, @PathVariable Long id) {
        return discMagRepository.findById(id)
                .map(discMag -> {
                    discMag.setTitle(newDiscMag.getTitle());
                    discMag.setPrice(newDiscMag.getPrice());
                    discMag.setCopies(newDiscMag.getCopies());
                    discMag.setOrderQty(newDiscMag.getOrderQty());
                    discMag.setCurrentIssue(newDiscMag.getCurrentIssue());
                    discMag.setHasDisc(newDiscMag.isHasDisc());

                    return discMagRepository.save(discMag);
                })
                .orElseGet(() -> {
                    newDiscMag.setId(id);
                    return discMagRepository.save(newDiscMag);
                });
    }

    @Operation(summary = "Delete a disc magazine")
    @DeleteMapping("/{id}")
    public void deleteDiscMag(@PathVariable Long id) {
        discMagRepository.deleteById(id);
    }
}
