package com.example.msreservaciones.feign;
import com.example.msreservaciones.dtos.StudentDto;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collections;

@FeignClient(name = "ms-estudiantes-service", path = "/students")
public interface StudentServiceClient {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "studentByIdCB", fallbackMethod = "fallbackGetStudentById")
    StudentDto getStudentById(@PathVariable("id") Long id);


    default StudentDto fallbackGetStudentById(Long id, Throwable e) {

        System.err.println("⚠️ CircuitBreaker: ms-estudiantes FALLÓ al obtener estudiante ID: " + id);

        return new StudentDto(
                id,
                "No disponible",
                "No disponible",
                "no-disponible@fallback.local",
                "N/A",
                "N/A",
                0,
                "N/A",
                false,
                null,
                null,
                Collections.emptyList()  // ← CORRECTO EN JAVA 8
        );
    }
}

