import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Services
import { ReservationService } from 'src/app/providers/services/reservations/reservation.service';
import { StudentService } from 'src/app/providers/services/reservations/student.service';
import { RoomService } from 'src/app/providers/services/reservations/room.service';

// Models
import { CancelReservationDto } from 'src/app/models/reservation-models';
import { ReservationTableDto } from 'src/app/models/reservation-table-model';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './tables.component.html'
})
export class AppTablesComponent implements OnInit {

  displayedColumns: string[] = ['student', 'room', 'status', 'actions'];
  dataSource: ReservationTableDto[] = [];

  selectedReservationId!: number;
  @ViewChild(MatMenuTrigger) matMenuTrigger!: MatMenuTrigger;

  constructor(
    private reservationService: ReservationService,
    private studentService: StudentService,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log('AppTablesComponent iniciado');
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getAll().pipe(
      catchError(err => {
        console.error('Error al obtener reservas:', err);
        this.showSnackBar('Error cargando reservas');
        return of([]);
      })
    ).subscribe(reservations => {
      console.log('Reservas recibidas del backend:', reservations);

      if (!reservations || reservations.length === 0) {
        console.warn('No hay reservas disponibles');
        this.dataSource = [];
        return;
      }

      const observables: Observable<ReservationTableDto>[] = reservations.map(r =>
        forkJoin({
          student: this.studentService.getById(r.studentId).pipe(
            catchError(err => {
              console.error('Error al obtener estudiante:', err);
              return of({ firstName: 'N/A', lastName: '' });
            })
          ),
          room: this.roomService.getById(r.roomId).pipe(
            catchError(err => {
              console.error('Error al obtener habitación:', err);
              return of({ roomNumber: 'N/A' });
            })
          )
        }).pipe(
          map(({ student, room }) => ({
            id: r.id,
            studentId: r.studentId,
            studentName: `${student.firstName} ${student.lastName}`,
            roomId: r.roomId,
            roomNumber: room.roomNumber,
            status: r.status,
            notes: r.notes,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            cancelledAt: r.cancelledAt,
            cancellationReason: r.cancellationReason
          }))
        )
      );

      forkJoin(observables).subscribe(
        results => {
          console.log('Datos combinados de reservas:', results);
          this.dataSource = results;
        },
        err => {
          console.error('Error combinando datos:', err);
        }
      );
    });
  }

  openMenu(reservationId: number) {
    this.selectedReservationId = reservationId;
    this.matMenuTrigger.openMenu();
  }

  confirm() { this.performAction(this.reservationService.confirm(this.selectedReservationId), 'Reserva confirmada'); }
  activate() { this.performAction(this.reservationService.activate(this.selectedReservationId), 'Reserva activada'); }
  complete() { this.performAction(this.reservationService.complete(this.selectedReservationId), 'Reserva completada'); }
  cancel() { 
    const cancelDto: CancelReservationDto = { cancellationReason: prompt('Ingrese el motivo de cancelación:', 'Cancelada desde UI') || 'Cancelada desde UI' };
    this.performAction(this.reservationService.cancel(this.selectedReservationId, cancelDto), 'Reserva cancelada'); 
  }

  private performAction(obs: Observable<any>, message: string) {
    obs.pipe(
      catchError(err => {
        console.error('Error en acción:', err);
        this.showSnackBar('Error al realizar la acción');
        return of(null);
      })
    ).subscribe(() => {
      this.showSnackBar(message);
      this.loadReservations();
    });
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'CANCELLED': return 'bg-light-warning text-warning';
      case 'REJECTED': return 'bg-light-error text-error';
      case 'CONFIRMED': return 'bg-light-success text-success';
      case 'ACTIVE': return 'bg-light-primary text-primary';
      case 'COMPLETED': return 'bg-light-secondary text-secondary';
      default: return '';
    }
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', { duration: 2500 });
  }
}
