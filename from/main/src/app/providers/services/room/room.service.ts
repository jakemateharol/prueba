// src/app/providers/services/room/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { END_POINTS } from '../../utils/end-points';
import { Observable } from 'rxjs';

export interface RoomDto {
  id: number;
  roomNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = `${environment.url}${END_POINTS.rooms}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(this.url);
  }

  getById(id: number): Observable<RoomDto> {
    return this.http.get<RoomDto>(`${this.url}/${id}`);
  }
}
