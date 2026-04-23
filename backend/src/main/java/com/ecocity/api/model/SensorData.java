package com.ecocity.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "sensor_data")
public class SensorData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String type; // Ex: AIR_QUALITY, TRASH_LEVEL

    @NotNull
    private Double value;

    @NotBlank
    private String unit; // Ex: AQI, PERCENTAGE

    private LocalDateTime timestamp = LocalDateTime.now();
}