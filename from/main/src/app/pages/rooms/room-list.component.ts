import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../providers/services/room/room.service';
import { RoomDto } from '../../models/room-models';
import { Router } from '@angular/router';

// 👉 Importaciones necesarias para Angular Material (Standalone)
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './room-list.component.html',

  // ⭐ IMPORTANTE → Aquí van los imports del HTML
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    NgFor,
    NgIf,
  ],
})
export class ListRoomsComponent implements OnInit {

  rooms: RoomDto[] = [];
  loading = true;

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
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

  deleteRoom(id: number) {
    if (!confirm('¿Estás seguro de eliminar esta habitación?')) return;

    this.roomService.deleteRoom(id).subscribe({
      next: () => {
        alert('Habitación eliminada');
        this.loadRooms();
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
