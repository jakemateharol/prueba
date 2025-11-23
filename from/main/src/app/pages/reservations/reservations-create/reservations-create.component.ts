// src/app/pages/reservations/reservations-create/reservations-create.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../../../providers/services/reservations/reservation.service';
import { CreateReservationDto } from '../../../models/reservation-models';

@Component({
  standalone: true,
  selector: 'app-reservations-create',
  templateUrl: './reservations-create.component.html',
  imports: [CommonModule, FormsModule]
})
export class ReservaCreateComponent {
  newReservation: CreateReservationDto = {} as CreateReservationDto;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  createReservation(): void {
    this.reservationService.create(this.newReservation).subscribe(
      () => {
        alert('Reserva creada exitosamente!');
        this.router.navigate(['/reservations']); // Regresa a la lista
      },
      (err) => alert('Error creando reserva: ' + err.error.message)
    );
  }

  cancel(): void {
    this.router.navigate(['/reservations']); // Cancelar y volver a la lista
  }
}
