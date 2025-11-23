import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../providers/services/room/room.service';
import { RoomDto, CreateRoomDto, UpdateRoomDto, RoomStatus } from './../../models/room-models';
import { RoomAvailabilityDto  } from './../../models/room-models';
import { catchError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
})
export class RoomListComponent implements OnInit {

  rooms: RoomDto[] = [];
  newRoom: CreateRoomDto = {} as CreateRoomDto;
  selectedRoom: RoomDto | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  // 👇 NECESARIO PARA USAR RoomStatus EN EL TEMPLATE
  RoomStatus = RoomStatus;

  constructor(
    private roomService: RoomService, 
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.isLoading = true;
    this.roomService.getAllRooms().pipe(
      catchError((error) => {
        this.errorMessage = error.message || 'Error al cargar las habitaciones.';
        this.isLoading = false;
        return [];
      })
    ).subscribe((data) => {
      this.rooms = data || [];
      if (!this.rooms.length) {
        this.errorMessage = 'No se encontraron habitaciones disponibles.';
      }
      this.isLoading = false;
    });
  }

  createRoom(): void {
    this.roomService.create(this.newRoom).pipe(
      catchError((error) => {
        this.errorMessage = error.message || 'Error al crear la habitación.';
        return [];
      })
    ).subscribe((room) => {
      this.rooms.push(room);
      this.newRoom = {} as CreateRoomDto;
    });
  }

  viewRoomDetails(room: RoomDto): void {
    this.selectedRoom = room;
  }

  updateRoom(): void {
    if (!this.selectedRoom) {
      this.errorMessage = 'No se ha seleccionado una habitación para actualizar.';
      return;
    }

    const updateDto: UpdateRoomDto = {
      type: this.selectedRoom.type,
      status: this.selectedRoom.status,
      capacity: this.selectedRoom.capacity,
      pricePerMonth: this.selectedRoom.pricePerMonth,
      description: this.selectedRoom.description,
      additionalServices: this.selectedRoom.additionalServices,
    };

    this.roomService.updateRoom(this.selectedRoom.id, updateDto).pipe(
      catchError((error) => {
        this.errorMessage = error.message || 'Error al actualizar la habitación.';
        return [];
      })
    ).subscribe((updatedRoom) => {
      this.selectedRoom = updatedRoom;
    });
  }

  checkAvailability(roomId: number): void {
    this.roomService.checkAvailability(roomId).pipe(
      catchError((error) => {
        this.errorMessage = error.message || 'Error al verificar la disponibilidad.';
        return [];
      })
    ).subscribe((availability: RoomAvailabilityDto) => {
      availability.available
        ? alert(`La habitación ${availability.roomId} está disponible.`)
        : alert(`No disponible. Estado: ${availability.message}`);
    });
  }

  updateRoomStatus(roomId: number, status: RoomStatus): void {
    this.roomService.updateRoomStatus(roomId, status).pipe(
      catchError((error) => {
        this.errorMessage = error.message || 'Error al actualizar el estado.';
        return [];
      })
    ).subscribe(() => {
      alert(`Estado de la habitación ${roomId} cambiado a ${status}.`);
      this.loadRooms();
    });
  }

  reserveRoom(roomId: number): void {
    this.roomService.reserveRoom(roomId).pipe(
      catchError((error) => {
        this.errorMessage = error.message || 'Error al reservar.';
        return [];
      })
    ).subscribe(() => {
      alert(`Habitación ${roomId} reservada.`);
      this.loadRooms();
    });
  }

  occupyRoom(roomId: number): void {
    this.roomService.occupyRoom(roomId).pipe(
      catchError((error) => {
        this.errorMessage = error.message || 'Error al ocupar.';
        return [];
      })
    ).subscribe(() => {
      alert(`Habitación ${roomId} ocupada.`);
      this.loadRooms();
    });
  }

  releaseRoom(roomId: number): void {
    this.roomService.releaseRoom(roomId).pipe(
      catchError((error) => {
        this.errorMessage = error.message || 'Error al liberar.';
        return [];
      })
    ).subscribe(() => {
      alert(`Habitación ${roomId} liberada.`);
      this.loadRooms();
    });
  }
}
