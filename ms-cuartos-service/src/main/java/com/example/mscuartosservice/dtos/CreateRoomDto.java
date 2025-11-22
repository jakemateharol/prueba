package com.example.mscuartosservice.dtos;

import com.example.mscuartosservice.Entity.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoomDto {
    //    indica que la propiedad solo puede ser accedida desde dentro de la clase.

//    Esto protege los datos y fuerza a usar getters y setters para leer o modificar el valor.
    private String roomNumber;
    //Almacena el tipo de habitación, que viene del enum Room.RoomType.

    //Por ejemplo: SINGLE, DOUBLE, SUITE
    private Room.RoomType type;
//    Integer en lugar de int permite que este campo pueda ser null, útil si no se requiere un valor obligatorio.
//
//    Almacena la capacidad de personas del cuarto
    private Integer capacity;
    private Integer floor;
//    BigDecimal para el precio mensual del cuarto, útil para cálculos precisos de dinero.
    private BigDecimal pricePerMonth;
    private String description;

//    Lista de servicios adicionales (ej: "Wifi", "Escritorio").
//
//    List<String> significa lista de cadenas.
    private List<String> additionalServices;
}