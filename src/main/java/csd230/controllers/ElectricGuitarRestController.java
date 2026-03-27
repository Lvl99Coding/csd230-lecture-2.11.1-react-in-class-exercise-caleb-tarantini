package csd230.controllers;


import csd230.entities.ElectricGuitarEntity;
import csd230.repositories.ElectricGuitarEntityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/electricguitars")
@CrossOrigin(origins = "*")
public class ElectricGuitarRestController {
    private final ElectricGuitarEntityRepository repository;

    public ElectricGuitarRestController(ElectricGuitarEntityRepository repository) {
        this.repository = repository;
    }


    @GetMapping
    public List<ElectricGuitarEntity> all() {
        return repository.findAll();
    }


    @PostMapping
    public ElectricGuitarEntity newElectricGuitar(@RequestBody ElectricGuitarEntity newElectricGuitar) {
        return repository.save(newElectricGuitar);
    }

    @PutMapping("/{id}")
    public ElectricGuitarEntity replaceElectricGuitar(@RequestBody ElectricGuitarEntity newElectricGuitar, @PathVariable Long id) {
        return repository.findById(id)
                .map(ElectricGuitar -> {
                    ElectricGuitar.setBrand(newElectricGuitar.getBrand());
                    ElectricGuitar.setModel(newElectricGuitar.getModel());
                    ElectricGuitar.setNumberOfStrings(newElectricGuitar.getNumberOfStrings());
                    ElectricGuitar.setNumberOfPickups(newElectricGuitar.getNumberOfPickups());
                    ElectricGuitar.setPrice(newElectricGuitar.getPrice());
                    return repository.save(ElectricGuitar);
                })
                .orElseThrow(() -> new RuntimeException("Electric Guitar not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteElectricGuitar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}