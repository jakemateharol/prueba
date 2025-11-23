import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';              // 👈 NECESARIO PARA *ngFor
import { MatCardModule } from '@angular/material/card';      // 👈 Para usar <mat-card>
import { RoomService } from '../../providers/services/room/room.service';
import { RoomDto } from '../../models/room-models';

@Component({
  selector: 'app-list-rooms',
  standalone: true,                                         // 👈 IMPORTANTE
  imports: [CommonModule, MatCardModule],                   // 👈 AQUÍ SE IMPORTA
  templateUrl: './room-list.component.html',
})
export class ListRoomsComponent implements OnInit {

  rooms: RoomDto[] = [];
  loading = true;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
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
}
