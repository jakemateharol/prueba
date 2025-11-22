// src/app/pages/reservations/reservations-list/reservations-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { ReservationService } from '../../../providers/services/reservations/reservation.service';
import { StudentService } from '../../../providers/services/students/student.service';
import { RoomService } from '../../../providers/services/room/room.service';
import { ReservationDto } from '../../../models/reservation-models';
import { StudentDto } from '../../../models/student-models';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [
  CommonModule,
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatProgressSpinnerModule,
  RouterModule
],

  
  templateUrl: './reservations-list.component.html',
})
export class ReservationsListComponent implements OnInit {
  reservations: ReservationDto[] = [];
  loading = true;

  studentsMap = new Map<number, string>();
  roomsMap = new Map<number, string>();

  constructor(
    private reservationService: ReservationService,
    private studentService: StudentService,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.loadStudentsAndRooms();
  }

  loadStudentsAndRooms() {
    forkJoin([
      this.studentService.getAll(), // retorna Observable<StudentDto[]>
      this.roomService.getAll(),    // retorna Observable<RoomDto[]>
    ]).subscribe({
      next: ([students, rooms]) => {
        // Mapeo seguro: solo si existen
        if (students) {
          students.forEach(s => this.studentsMap.set(s.id, `${s.firstName} ${s.lastName}`));
        }
        if (rooms) {
          rooms.forEach(r => this.roomsMap.set(r.id, r.roomNumber));
        }
        this.loadReservations();
      },
      error: err => {
        console.error('Error cargando estudiantes o habitaciones:', err);
        this.loadReservations(); // Igual cargamos reservas aunque fallen
      }
    });
  }

  loadReservations() {
    this.loading = true;
    this.reservationService.getAll().subscribe({
      next: data => {
        this.reservations = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error cargando reservas:', err);
        this.loading = false;
      },
    });
  }

  getStudentName(studentId: number): string {
    return this.studentsMap.get(studentId) || 'Desconocido';
  }

  getRoomNumber(roomId: number): string {
    return this.roomsMap.get(roomId) || 'Desconocido';
  }

  confirm(id: number) {
    this.reservationService.confirm(id).subscribe(() => this.loadReservations());
  }

  activate(id: number) {
    this.reservationService.activate(id).subscribe(() => this.loadReservations());
  }

  complete(id: number) {
    this.reservationService.complete(id).subscribe(() => this.loadReservations());
  }

  cancel(id: number) {
    const motivo = prompt('Motivo de cancelación:');
    if (!motivo) return;
    this.reservationService.cancel(id, { cancellationReason: motivo }).subscribe(() => this.loadReservations());
  }
}
