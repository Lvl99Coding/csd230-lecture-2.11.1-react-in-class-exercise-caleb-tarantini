package csd230.repositories;

import csd230.entities.ComicBookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComicBookRepository extends JpaRepository<ComicBookEntity, Long> {
}
