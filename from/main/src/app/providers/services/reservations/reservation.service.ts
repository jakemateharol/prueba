// src/app/providers/services/reservations/reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { END_POINTS } from '../../utils/end-points';
import { Observable } from 'rxjs';
import { ReservationDto, CreateReservationDto, CancelReservationDto } from '../../../models/reservation-models';
import { EntityDataService } from '../../utils/entity-data';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends EntityDataService<ReservationDto> {

  constructor(protected override httpClient: HttpClient) {
    const baseUrl = environment.url.endsWith('/')
      ? environment.url.slice(0, -1)
      : environment.url;

    const endpoint = END_POINTS.reservations.startsWith('/')
      ? END_POINTS.reservations
      : '/' + END_POINTS.reservations;

    super(httpClient, `${baseUrl}${endpoint}`);
  }

  // Crear reserva
  create(dto: CreateReservationDto): Observable<ReservationDto> {
    return this.httpClient.post<ReservationDto>(`${this.endPoint}`, dto);
  }

  // Confirmar reserva
  confirm(id: number): Observable<ReservationDto> {
    return this.httpClient.post<ReservationDto>(`${this.endPoint}/${id}/confirm`, {});
  }

  // Activar reserva
  activate(id: number): Observable<ReservationDto> {
    return this.httpClient.post<ReservationDto>(`${this.endPoint}/${id}/activate`, {});
  }

  // Completar reserva
  complete(id: number): Observable<ReservationDto> {
    return this.httpClient.post<ReservationDto>(`${this.endPoint}/${id}/complete`, {});
  }

  // Cancelar reserva
  cancel(id: number, cancelDto: CancelReservationDto): Observable<ReservationDto> {
    return this.httpClient.post<ReservationDto>(`${this.endPoint}/${id}/cancel`, cancelDto);
  }

  // Obtener reservas por estudiante
  getByStudent(studentId: number): Observable<ReservationDto[]> {
    return this.httpClient.get<ReservationDto[]>(`${this.endPoint}/student/${studentId}`);
  }

  // Obtener reservas por habitación
  getByRoom(roomId: number): Observable<ReservationDto[]> {
    return this.httpClient.get<ReservationDto[]>(`${this.endPoint}/room/${roomId}`);
  }
}
