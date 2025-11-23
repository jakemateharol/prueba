import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { END_POINTS } from '../../utils/end-points';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';  // Importamos tap
import { RoomDto, CreateRoomDto, UpdateRoomDto, RoomAvailabilityDto } from '../../../models/room-models';
import { EntityDataService } from '../../utils/entity-data';

@Injectable({
  providedIn: 'root',
})
export class RoomService extends EntityDataService<RoomDto> {

  constructor(protected override httpClient: HttpClient) {
    // Asegurarse de que la URL base no tenga una barra diagonal adicional
    const baseUrl = environment.url.endsWith('/') ? environment.url.slice(0, -1) : environment.url;
    const endpoint = END_POINTS.rooms.startsWith('/') ? END_POINTS.rooms : '/' + END_POINTS.rooms;

    super(httpClient, `${baseUrl}${endpoint}`);
  }

  // Método genérico para obtener habitaciones con diferentes filtros
  private getRoomsByQuery(query: string, value: string | number): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}/${query}/${value}`).pipe(
      tap((response) => {
        console.log(`Respuesta de la API (getRoomsByQuery ${query}):`, response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Crear habitación
  create(dto: CreateRoomDto): Observable<RoomDto> {
    return this.httpClient.post<RoomDto>(`${this.endPoint}`, dto).pipe(
      tap((response) => {
        console.log('Respuesta de la API (create):', response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Actualizar habitación
  updateRoom(id: number, dto: UpdateRoomDto): Observable<RoomDto> {
    return this.httpClient.put<RoomDto>(`${this.endPoint}/${id}`, dto).pipe(
      tap((response) => {
        console.log(`Respuesta de la API (updateRoom ${id}):`, response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Obtener habitación por ID (ahora devuelve un solo objeto, no un arreglo)
  getRoomById(id: number): Observable<RoomDto> {
    return this.getRoomsByQuery('id', id).pipe(
      map(rooms => rooms[0]),  // Transformamos el Observable<RoomDto[]> en Observable<RoomDto> tomando el primer elemento
      tap((response) => {
        console.log(`Respuesta de la API (getRoomById ${id}):`, response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Obtener habitación por número (ahora devuelve un solo objeto, no un arreglo)
  getRoomByNumber(roomNumber: string): Observable<RoomDto> {
    return this.getRoomsByQuery('number', roomNumber).pipe(
      map(rooms => rooms[0]),  // Transformamos el Observable<RoomDto[]> en Observable<RoomDto> tomando el primer elemento
      tap((response) => {
        console.log(`Respuesta de la API (getRoomByNumber ${roomNumber}):`, response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Obtener todas las habitaciones
  getAllRooms(): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}`).pipe(
      tap((response) => {
        console.log('Respuesta de la API (getAllRooms):', response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Obtener habitaciones disponibles
  getAvailableRooms(): Observable<RoomDto[]> {
    return this.httpClient.get<RoomDto[]>(`${this.endPoint}/available`).pipe(
      tap((response) => {
        console.log('Respuesta de la API (getAvailableRooms):', response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Obtener habitaciones por tipo
  getRoomsByType(type: string): Observable<RoomDto[]> {
    return this.getRoomsByQuery('type', type).pipe(
      tap((response) => {
        console.log(`Respuesta de la API (getRoomsByType ${type}):`, response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Obtener habitaciones por estado
  getRoomsByStatus(status: string): Observable<RoomDto[]> {
    return this.getRoomsByQuery('status', status).pipe(
      tap((response) => {
        console.log(`Respuesta de la API (getRoomsByStatus ${status}):`, response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Obtener habitaciones por piso
  getRoomsByFloor(floor: number): Observable<RoomDto[]> {
    return this.getRoomsByQuery('floor', floor).pipe(
      tap((response) => {
        console.log(`Respuesta de la API (getRoomsByFloor ${floor}):`, response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Verificar si una habitación con el número especificado ya existe
  checkRoomExistence(roomNumber: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.endPoint}/exists/${roomNumber}`).pipe(
      tap((response) => {
        console.log(`Respuesta de la API (checkRoomExistence ${roomNumber}):`, response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Cambiar estado de habitación
  updateRoomStatus(id: number, status: string): Observable<void> {
    return this.httpClient.patch<void>(`${this.endPoint}/${id}/status?status=${status}`, {}).pipe(
      tap(() => {
        console.log(`Estado actualizado de la habitación ${id} a ${status}`);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Reservar habitación
  reserveRoom(id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.endPoint}/${id}/reserve`, {}).pipe(
      tap(() => {
        console.log(`Habitación ${id} reservada`);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Ocupar habitación
  occupyRoom(id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.endPoint}/${id}/occupy`, {}).pipe(
      tap(() => {
        console.log(`Habitación ${id} ocupada`);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Liberar habitación
  releaseRoom(id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.endPoint}/${id}/release`, {}).pipe(
      tap(() => {
        console.log(`Habitación ${id} liberada`);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Verificar disponibilidad de una habitación
  checkAvailability(id: number): Observable<RoomAvailabilityDto> {
    return this.httpClient.get<RoomAvailabilityDto>(`${this.endPoint}/${id}/availability`).pipe(
      tap((response) => {
        console.log(`Disponibilidad de la habitación ${id}:`, response);  // Log de la respuesta
      }),
      catchError(this.handleError)
    );
  }

  // Manejar errores del backend
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    // Error en el lado del cliente
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
      console.error('Error en la solicitud (cliente):', error.error);  // Log del error del cliente
    } else {
      // Manejar el error según el código de estado HTTP
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid data provided!';
          break;
        case 404:
          errorMessage = 'Room not found!';
          break;
        case 409:
          errorMessage = 'Room already exists!';
          break;
        case 503:
          errorMessage = 'Service unavailable. Please try again later!';
          break;
        default:
          errorMessage = `Server error: ${error.message || 'Unknown error'}`;
      }
      console.error('Error en la solicitud (servidor):', error);  // Log del error del servidor
    }

    // Lanza un error con el mensaje adecuado
    return throwError(() => new Error(errorMessage));
  }
}
