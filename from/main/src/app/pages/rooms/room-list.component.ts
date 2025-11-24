import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../providers/services/room/room.service';
import { RoomDto } from '../../models/room-models';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './room-list.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    NgFor,
    NgIf,
  ],
})
export class ListRoomsComponent implements OnInit {

  rooms: RoomDto[] = [];
  loading = true;

  // Filtros
  filterType: string = '';
  filterStatus: string = '';
  filterFloor: number | null = null;

  roomTypes = ['SINGLE', 'DOUBLE', 'SUITE'];
  roomStatuses = ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'RESERVED'];

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  // =====================
  // Cargar habitaciones
  // =====================
  loadRooms() {
    this.loading = true;
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  // =====================
  // Filtrar habitaciones
  // =====================
  applyFilters() {
    this.loading = true;

    // Si hay filtros activos, los aplicamos uno por uno
    if (this.filterType) {
      this.roomService.getRoomsByType(this.filterType).subscribe({
        next: (data) => {
          this.rooms = data;
          this.applyStatusAndFloorFilters(); // aplicar los demás filtros sobre este resultado
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      // Si no hay filtro de tipo, cargamos todo
      this.loadRoomsWithStatusAndFloor();
    }
  }

  private loadRoomsWithStatusAndFloor() {
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.applyStatusAndFloorFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  private applyStatusAndFloorFilters() {
    if (this.filterStatus) {
      this.rooms = this.rooms.filter(r => r.status === this.filterStatus);
    }
    if (this.filterFloor !== null) {
      this.rooms = this.rooms.filter(r => r.floor === this.filterFloor);
    }
  }

  // =====================
  // Operaciones
  // =====================
  deleteRoom(id: number) {
    if (!confirm('¿Estás seguro de eliminar esta habitación?')) return;

    this.roomService.deleteRoom(id).subscribe({
      next: () => {
        alert('Habitación eliminada');
        this.applyFilters();
      },
      error: (err) => {
        console.error(err);
        alert('Error al eliminar');
      }
    });
  }

  editRoom(id: number) {
    this.router.navigate(['/rooms/edit', id]);
  }

  goToCreateRoom() {
    this.router.navigate(['/rooms/create']);
  }
}
