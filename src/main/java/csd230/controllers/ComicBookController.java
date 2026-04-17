package csd230.controllers;

import csd230.entities.ComicBookEntity;
import csd230.repositories.ComicBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/rest/comicbooks")
@CrossOrigin(origins = "*")
public class ComicBookController {

    private final ComicBookRepository comicBookRepository;


    public ComicBookController(ComicBookRepository comicBookRepository) {
        this.comicBookRepository = comicBookRepository;
    }

    @GetMapping
    public List<ComicBookEntity> all() {
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
    public ComicBookEntity updateComicBook(@RequestBody ComicBookEntity updatedComicBook, @PathVariable Long id) {
        System.out.println("Received payload: " + updatedComicBook);
        return comicBookRepository.findById(id).map(comicBook -> {
            comicBook.setTitle(updatedComicBook.getTitle());
            comicBook.setAuthor(updatedComicBook.getAuthor());
            comicBook.setPrice(updatedComicBook.getPrice());
            comicBook.setCopies(updatedComicBook.getCopies());
            comicBook.setGenre(updatedComicBook.getGenre());

            return comicBookRepository.save(comicBook);
        }).orElseGet(() -> {
            updatedComicBook.setId(id);
            return comicBookRepository.save(updatedComicBook);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteComicBook(@PathVariable Long id) {
        comicBookRepository.deleteById(id);
    }
}
