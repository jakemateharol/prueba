import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../../../providers/services/reservations/reservation.service';
import { ReservationDto, CancelReservationDto, CreateReservationDto } from '../../../models/reservation-models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  imports: [CommonModule, FormsModule]
})
export class ReservationsListComponent implements OnInit {

  reservations: ReservationDto[] = [];
  newReservation: CreateReservationDto = {} as CreateReservationDto;

  // 🔹 Map para manejar motivo de cancelación por reserva
  cancelReasons: Map<number, string> = new Map();

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAll().subscribe({
      next: data => this.reservations = data,
      error: err => console.error(err)
    });
  }

  goToCreate(): void {
    this.router.navigate(['/reservations/create']);
  }

  confirmReservation(id: number): void {
    this.reservationService.confirm(id).subscribe(() => this.loadReservations());
  }

  activateReservation(id: number): void {
    this.reservationService.activate(id).subscribe(() => this.loadReservations());
  }

  completeReservation(id: number): void {
    this.reservationService.complete(id).subscribe(() => this.loadReservations());
  }

  cancelReservation(id: number): void {
    const reason = this.cancelReasons.get(id) || '';
    if (!reason.trim()) {
      alert('Debe ingresar un motivo de cancelación');
      return;
    }

    const cancelDto: CancelReservationDto = { cancellationReason: reason };
    this.reservationService.cancel(id, cancelDto).subscribe(() => {
      this.cancelReasons.delete(id); // limpiar el input
      this.loadReservations();
    });
  }
}
