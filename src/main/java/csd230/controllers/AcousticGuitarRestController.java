package csd230.controllers;


import csd230.entities.AcousticGuitarEntity;
import csd230.repositories.AcousticGuitarEntityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/acousticguitars")
@CrossOrigin(origins = "*")
public class AcousticGuitarRestController {
    private final AcousticGuitarEntityRepository repository;

    public AcousticGuitarRestController(AcousticGuitarEntityRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<AcousticGuitarEntity> all() {
        return repository.findAll();
    }

    @PostMapping
    public AcousticGuitarEntity newAcousticGuitar(@RequestBody AcousticGuitarEntity newAcousticGuitar) {
        return repository.save(newAcousticGuitar);
    }

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
                .orElseThrow(() -> new RuntimeException("Acoustic Guitar not found")); // Throw an exception for not found
    }
    
    @DeleteMapping("/{id}")
    public void deleteAcousticGuitar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}