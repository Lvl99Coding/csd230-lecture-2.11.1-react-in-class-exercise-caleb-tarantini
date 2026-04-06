package csd230.controllers;


import csd230.entities.AcousticGuitarEntity;
import csd230.repositories.AcousticGuitarEntityRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rest/acousticguitars")
@CrossOrigin(origins = "*")
public class AcousticGuitarRestController {
    private final AcousticGuitarEntityRepository repository;

    public AcousticGuitarRestController(AcousticGuitarEntityRepository repository) {
        this.repository = repository;
    }

    @Operation(summary = "Get all acoustic guitars as JSON")
    @GetMapping
    public List<AcousticGuitarEntity> all() {
        return repository.findAll(); // Fetch AcousticGuitarEntity
    }

    @Operation(summary = "Create new AcousticGuitar")
    @PostMapping
    public AcousticGuitarEntity newAcousticGuitar(@RequestBody AcousticGuitarEntity newAcousticGuitar) {
        return repository.save(newAcousticGuitar);
    }

    @Operation(summary = "Update or Replace an acoustic guitar")
    @PutMapping("/{id}")
    public AcousticGuitarEntity replaceAcousticGuitar(@RequestBody AcousticGuitarEntity newAcousticGuitar, @PathVariable Long id) {
        return repository.findById(id)
                .map(AcousticGuitar -> {
                    AcousticGuitar.setBrand(newAcousticGuitar.getBrand());
                    AcousticGuitar.setModel(newAcousticGuitar.getModel());
                    AcousticGuitar.setNumberOfStrings(newAcousticGuitar.getNumberOfStrings());
                    AcousticGuitar.setHasCutaway(newAcousticGuitar.getHasCutaway());
                    AcousticGuitar.setPrice(newAcousticGuitar.getPrice());
                    return repository.save(AcousticGuitar); // Return the saved entity directly
                })
                .orElseGet(() -> {
                    newAcousticGuitar.setId(id);
                    return repository.save(newAcousticGuitar);
                }); // Throw an exception for not found
    }

    @Operation(summary = "Delete an acoustic guitar")
    @DeleteMapping("/{id}")
    public void deleteAcousticGuitar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}