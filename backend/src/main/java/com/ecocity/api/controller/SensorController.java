package com.ecocity.api.controller;

import com.ecocity.api.model.SensorData;
import com.ecocity.api.repository.SensorDataRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sensors")
@CrossOrigin(origins = "*") // Permite que o Frontend React acesse a API
public class SensorController {

    @Autowired
    private SensorDataRepository repository;

    @GetMapping
    public List<SensorData> getAllData() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<SensorData> registerData(@Valid @RequestBody SensorData data) {
        SensorData savedData = repository.save(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedData);
    }
}