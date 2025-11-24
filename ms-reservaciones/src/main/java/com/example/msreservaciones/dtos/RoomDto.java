package com.example.msreservaciones.dtos;

import com.example.msreservaciones.Entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {

    private Long id;
    private String roomNumber;
    private String type; // INDIVIDUAL, DOUBLE, SUITE
    private String status; // AVAILABLE, OCCUPIED...
    private Integer capacity;
    private Integer floor;
    private BigDecimal pricePerMonth;
    private String description;
    private List<String> additionalServices;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
