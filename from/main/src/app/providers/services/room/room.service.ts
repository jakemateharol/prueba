// src/app/providers/services/room/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { END_POINTS } from '../../utils/end-points';
import { Observable } from 'rxjs';
import { RoomDto, CreateRoomDto, UpdateRoomDto, RoomAvailabilityDto } from '../../../models/room-models';
import { EntityDataService } from '../../utils/entity-data';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends EntityDataService<RoomDto> {

  constructor(protected override httpClient: HttpClient) {
    const baseUrl = environment.url.endsWith('/') ? environment.url.slice(0, -1) : environment.url;
    const endpoint = END_POINTS.rooms.startsWith('/') ? END_POINTS.rooms : '/' + END_POINTS.rooms;
    super(httpClient, `${baseUrl}${endpoint}`);
  }

  // Crear
  createRoom(dto: CreateRoomDto): Observable<RoomDto> {
    return this.httpClient.post<RoomDto>(`${this.endPoint}`, dto);
  }

  // Obtener por número
  getByNumber(roomNumber: string): Observable<RoomDto> {
    return this.httpClient.get<RoomDto>(`${this.endPoint}/number/${encodeURIComponent(roomNumber)}`);
  }

  // Obtener disponibles
  getAvailable(): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}/available`);
  }

  // Por tipo
  getByType(type: string): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}/type/${encodeURIComponent(type)}`);
  }

  // Por status
  getByStatus(status: string): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}/status/${encodeURIComponent(status)}`);
  }

  // Check availability
  checkAvailability(id: number): Observable<RoomAvailabilityDto> {
    return this.httpClient.get<RoomAvailabilityDto>(`${this.endPoint}/${id}/availability`);
  }

  // Cambiar estado (PATCH /{id}/status?status=...)
  updateStatus(id: number, status: string): Observable<void> {
    const params = new HttpParams().set('status', status);
    return this.httpClient.patch<void>(`${this.endPoint}/${id}/status`, null, { params });
  }

  // Reservar / Ocupar / Liberar
  reserve(id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.endPoint}/${id}/reserve`, {});
  }

  occupy(id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.endPoint}/${id}/occupy`, {});
  }

  release(id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.endPoint}/${id}/release`, {});
  }

  // Eliminar (heredado delete)
  // update (usar update$ o put directo)
  updateRoom(id: number, dto: UpdateRoomDto): Observable<RoomDto> {
    return this.httpClient.put<RoomDto>(`${this.endPoint}/${id}`, dto);
  }
}
