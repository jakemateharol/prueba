import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReservationService } from '../../../providers/services/reservations/reservation.service';
import { StudentService } from '../../../providers/services/students/student.service';
import { RoomService } from '../../../providers/services/room/room.service';
import { StudentDto } from '../../../models/student-models';
import { RoomDto } from '../../../models/room-models';
import { CreateReservationDto } from '../../../models/reservation-models';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservations-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './reservations-create.component.html',
})
export class ReservaCreateComponent implements OnInit {
  form!: FormGroup;
  students: StudentDto[] = [];
  rooms: RoomDto[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private studentService: StudentService,
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      studentId: ['', Validators.required],
      roomId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      notes: ['']
    });

    // Cargar estudiantes y habitaciones
    this.studentService.getAll().subscribe(data => this.students = data);
    this.roomService.getAll().subscribe(data => this.rooms = data);
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    const dto: CreateReservationDto = this.form.value;

    this.reservationService.create(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/reservations']);
      },
      error: err => {
        this.loading = false;
        console.error('Error creando reserva:', err);
      }
    });
  }
}
