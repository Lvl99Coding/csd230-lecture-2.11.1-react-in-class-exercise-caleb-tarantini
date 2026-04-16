package csd230.controllers;

import csd230.entities.ComicBookEntity;
import csd230.repositories.ComicBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/rest/comicbooks")
public class ComicBookController {

    private final ComicBookRepository comicBookRepository;

    @Autowired
    public ComicBookController(ComicBookRepository comicBookRepository) {
        this.comicBookRepository = comicBookRepository;
    }

    @GetMapping
    public List<ComicBookEntity> getAllComicBooks() {
        return comicBookRepository.findAll();
    }

    @PostMapping
    public ComicBookEntity createComicBook(@RequestBody ComicBookEntity comicBook) {
        return comicBookRepository.save(comicBook);
    }

    @GetMapping("/{id}")
    public ComicBookEntity getComicBookById(@PathVariable Long id) {
        return comicBookRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ComicBookEntity updateComicBook(@PathVariable Long id, @RequestBody ComicBookEntity updatedComicBook) {
        return comicBookRepository.findById(id).map(comicBook -> {
            comicBook.setGenre(updatedComicBook.getGenre());
            return comicBookRepository.save(comicBook);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteComicBook(@PathVariable Long id) {
        comicBookRepository.deleteById(id);
    }
}
