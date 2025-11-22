import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { END_POINTS } from '../../utils/end-points';
import { Observable } from 'rxjs';
import { ReservationDto, CancelReservationDto } from '../../../models/reservation-models';
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

  // 🔹 Crear una reserva
  create(dto: any): Observable<ReservationDto> {
    return this.httpClient.post<ReservationDto>(`${this.endPoint}`, dto);
  }

  confirm(id: number): Observable<ReservationDto> {
    return this.httpClient.post<ReservationDto>(`${this.endPoint}/${id}/confirm`, {});
  }

  activate(id: number): Observable<ReservationDto> {
    return this.httpClient.post<ReservationDto>(`${this.endPoint}/${id}/activate`, {});
  }

  complete(id: number): Observable<ReservationDto> {
    return this.httpClient.post<ReservationDto>(`${this.endPoint}/${id}/complete`, {});
  }

  cancel(id: number, cancelDto: CancelReservationDto): Observable<ReservationDto> {
    return this.httpClient.post<ReservationDto>(`${this.endPoint}/${id}/cancel`, cancelDto);
  }

  getByStudent(studentId: number): Observable<ReservationDto[]> {
    return this.httpClient.get<ReservationDto[]>(`${this.endPoint}/student/${studentId}`);
  }

  getByRoom(roomId: number): Observable<ReservationDto[]> {
    return this.httpClient.get<ReservationDto[]>(`${this.endPoint}/room/${roomId}`);
  }
}
