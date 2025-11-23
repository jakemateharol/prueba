package com.example.mscuartosservice.Controller;

import com.example.mscuartosservice.Entity.Room;
import com.example.mscuartosservice.Service.RoomService;
import com.example.mscuartosservice.dtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<RoomDto> createRoom(@RequestBody CreateRoomDto createDto) {
        return ResponseEntity.ok(roomService.createRoom(createDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    @GetMapping("/number/{roomNumber}")
    public ResponseEntity<RoomDto> getRoomByNumber(@PathVariable String roomNumber) {
        return ResponseEntity.ok(roomService.getRoomByNumber(roomNumber));
    }

    @GetMapping
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/available")
    public ResponseEntity<List<RoomDto>> getAvailableRooms() {
        return ResponseEntity.ok(roomService.getAvailableRooms());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<RoomDto>> getRoomsByType(@PathVariable String type) {
        return ResponseEntity.ok(roomService.getRoomsByType(Room.RoomType.valueOf(type.toUpperCase())));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<RoomDto>> getRoomsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(roomService.getRoomsByStatus(Room.RoomStatus.valueOf(status.toUpperCase())));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable Long id, @RequestBody UpdateRoomDto updateDto) {
        return ResponseEntity.ok(roomService.updateRoom(id, updateDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/availability")
    public ResponseEntity<RoomAvailabilityDto> checkAvailability(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.checkAvailability(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateRoomStatus(@PathVariable Long id, @RequestParam String status) {
        roomService.updateRoomStatus(id, Room.RoomStatus.valueOf(status.toUpperCase()));
        return ResponseEntity.ok().build();
    }
}

