package csd230.controllers;

import csd230.entities.TabletEntity;
import csd230.repositories.TabletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/rest/tablets")
public class TabletController {

    private final TabletRepository tabletRepository;

    @Autowired
    public TabletController(TabletRepository tabletRepository) {
        this.tabletRepository = tabletRepository;
    }

    @GetMapping
    public List<TabletEntity> getAllTablets() {
        return tabletRepository.findAll();
    }

    @PostMapping
    public TabletEntity createTablet(@RequestBody TabletEntity tablet) {
        return tabletRepository.save(tablet);
    }

    @GetMapping("/{id}")
    public TabletEntity getTabletById(@PathVariable Long id) {
        return tabletRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public TabletEntity updateTablet(@PathVariable Long id, @RequestBody TabletEntity updatedTablet) {
        return tabletRepository.findById(id).map(tablet -> {
            tablet.setBrand(updatedTablet.getBrand());
            tablet.setScreenSize(updatedTablet.getScreenSize());
            tablet.setPrice(updatedTablet.getPrice());
            return tabletRepository.save(tablet);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteTablet(@PathVariable Long id) {
        tabletRepository.deleteById(id);
    }
}
