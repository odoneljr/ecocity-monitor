package com.ecocity.api.repository;

import com.ecocity.api.model.SensorData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SensorDataRepository extends JpaRepository<SensorData, Long> {
    // Isso faz o Spring criar automaticamente uma consulta que traz o mais novo
    // primeiro
    List<SensorData> findAllByOrderByIdDesc();
}