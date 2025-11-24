import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { END_POINTS } from '../../utils/end-points';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  RoomDto,
  CreateRoomDto,
  UpdateRoomDto,
  RoomAvailabilityDto
} from '../../../models/room-models';

import { EntityDataService } from '../../utils/entity-data';

@Injectable({
  providedIn: 'root',
})
export class RoomService extends EntityDataService<RoomDto> {

  constructor(protected override httpClient: HttpClient) {
    const baseUrl = environment.url.endsWith('/') ? environment.url.slice(0, -1) : environment.url;
    const endpoint = END_POINTS.rooms.startsWith('/') ? END_POINTS.rooms : '/' + END_POINTS.rooms;
    super(httpClient, `${baseUrl}${endpoint}`);
  }

  // =====================
  // CREATE ROOM
  // =====================
  createRoom(dto: CreateRoomDto): Observable<RoomDto> {
    return this.httpClient.post<RoomDto>(`${this.endPoint}`, dto)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // UPDATE ROOM
  // =====================
  updateRoom(id: number, dto: UpdateRoomDto): Observable<RoomDto> {
    return this.httpClient.put<RoomDto>(`${this.endPoint}/${id}`, dto)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // GET BY ID
  // =====================
  getRoomById(id: number): Observable<RoomDto> {
    return this.httpClient.get<RoomDto>(`${this.endPoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // GET BY ROOM NUMBER
  // =====================
  getRoomByNumber(roomNumber: string): Observable<RoomDto> {
    return this.httpClient.get<RoomDto>(`${this.endPoint}/number/${roomNumber}`)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // GET ALL ROOMS
  // =====================
  getAllRooms(): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}`)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // GET AVAILABLE ROOMS
  // =====================
  getAvailableRooms(): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}/available`)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // GET ROOMS BY TYPE
  // =====================
  getRoomsByType(type: string): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}/type/${type}`)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // GET ROOMS BY STATUS
  // =====================
  getRoomsByStatus(status: string): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}/status/${status}`)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // GET ROOMS BY FLOOR
  // =====================
  getRoomsByFloor(floor: number): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}/floor/${floor}`)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // CHECK ROOM EXISTENCE (Opcional)
  // =====================
  checkRoomExistence(roomNumber: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.endPoint}/exists/${roomNumber}`)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // CHECK AVAILABILITY
  // =====================
  checkAvailability(id: number): Observable<RoomAvailabilityDto> {
    return this.httpClient.get<RoomAvailabilityDto>(`${this.endPoint}/${id}/availability`)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // DELETE ROOM
  // =====================
  deleteRoom(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.endPoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // =====================
  // UPDATE ROOM STATUS (PATCH)
  // =====================
  updateRoomStatus(id: number, status: string): Observable<void> {
    // ⚡ FIX: Se envía un body vacío {} porque HttpClient PATCH requiere un segundo parámetro
    return this.httpClient.patch<void>(`${this.endPoint}/${id}/status?status=${status}`, {})
      .pipe(catchError(this.handleError));
  }

  // =====================
  // ERROR HANDLER
  // =====================
  private handleError(error: any): Observable<never> {
    // Aquí podrías mejorar mostrando mensajes más amigables según status code
    return throwError(() => error);
  }
}
