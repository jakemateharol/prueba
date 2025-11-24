package com.example.msreservaciones.feign;

import com.example.msreservaciones.dtos.RoomAvailabilityDto;
import com.example.msreservaciones.dtos.RoomDto;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "ms-cuartos-service", path = "/rooms")
public interface RoomServiceClient {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "roomByIdCB", fallbackMethod = "fallbackGetRoomById")
    RoomDto getRoomById(@PathVariable("id") Long id);

    default RoomDto fallbackGetRoomById(Long id, Throwable e) {
        return new RoomDto(
                id,
                "N/A",
                null,
                null,
                0,
                0,
                null,
                "Servicio no disponible",
                List.of(),
                null,
                null
        );
    }

    @GetMapping("/{id}/availability")
    @CircuitBreaker(name = "roomAvailabilityCB", fallbackMethod = "fallbackCheckAvailability")
    RoomAvailabilityDto checkAvailability(@PathVariable("id") Long id);

    default RoomAvailabilityDto fallbackCheckAvailability(Long id, Throwable e) {
        return new RoomAvailabilityDto(
                id,
                false,
                "Servicio ms-cuartos no disponible"
        );
    }

    @PatchMapping("/{id}/status")
    @CircuitBreaker(name = "roomStatusCB", fallbackMethod = "fallbackUpdateRoomStatus")
    void updateRoomStatus(@PathVariable("id") Long id, @RequestParam("status") String status);

    default void fallbackUpdateRoomStatus(Long id, String status, Throwable e) {
        throw new RuntimeException(
                "No se pudo cambiar el estado de la habitación " + id +
                        " → servicio no disponible"
        );
    }
}
