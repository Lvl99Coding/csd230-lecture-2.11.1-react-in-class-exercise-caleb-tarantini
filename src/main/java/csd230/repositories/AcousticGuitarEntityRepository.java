package csd230.repositories;


import csd230.entities.AcousticGuitarEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcousticGuitarEntityRepository extends JpaRepository<AcousticGuitarEntity, Long> {
    AcousticGuitarEntity findById(long id);
    List<AcousticGuitarEntity> findByHasCutaway(boolean hasCutaway);
}