package csd230.controllers;


import csd230.entities.ElectricGuitarEntity;
import csd230.repositories.ElectricGuitarEntityRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/rest/electricguitars")
@CrossOrigin(origins = "*")
public class ElectricGuitarRestController {
    private final ElectricGuitarEntityRepository electricGuitarRepository;

    public ElectricGuitarRestController(ElectricGuitarEntityRepository repository) {
        this.electricGuitarRepository = repository;
    }

    @Operation(summary = "Get all electric guitars as JSON")
    @GetMapping
    public List<ElectricGuitarEntity> all() {
        return electricGuitarRepository.findAll(); // Fetch ElectricGuitarEntity
    }

    @Operation(summary = "Create new ElectricGuitar")
    @PostMapping
    public ElectricGuitarEntity newElectricGuitar(@RequestBody ElectricGuitarEntity newElectricGuitar) {
        return electricGuitarRepository.save(newElectricGuitar);
    }

    @Operation(summary = "Update or Replace an electric guitar")
    @PutMapping("/{id}")
    public ElectricGuitarEntity replaceElectricGuitar(@RequestBody ElectricGuitarEntity newElectricGuitar, @PathVariable Long id) {
        return electricGuitarRepository.findById(id)
                .map(ElectricGuitar -> {
                    ElectricGuitar.setBrand(newElectricGuitar.getBrand());
                    ElectricGuitar.setModel(newElectricGuitar.getModel());
                    ElectricGuitar.setNumberOfStrings(newElectricGuitar.getNumberOfStrings());
                    ElectricGuitar.setNumberOfPickups(newElectricGuitar.getNumberOfPickups());
                    ElectricGuitar.setPrice(newElectricGuitar.getPrice());
                    return electricGuitarRepository.save(ElectricGuitar);
                })
                .orElseGet(() -> {
                    newElectricGuitar.setId(id);
                    return electricGuitarRepository.save(newElectricGuitar);
                });
    }

    @Operation(summary = "Delete an electric guitar")
    @DeleteMapping("/{id}")
    public void deleteElectricGuitar(@PathVariable Long id) {
        electricGuitarRepository.deleteById(id);
    }
}