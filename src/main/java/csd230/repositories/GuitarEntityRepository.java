package csd230.repositories;

import csd230.entities.GuitarEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuitarEntityRepository extends JpaRepository<GuitarEntity, Long> {
    GuitarEntity findById(long id);
    List<GuitarEntity> findAll();
    List<GuitarEntity> findByNumberOfStrings(int numberOfStrings);
}