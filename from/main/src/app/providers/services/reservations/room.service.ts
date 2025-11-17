import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { Observable } from 'rxjs';
import { RoomDto } from '../../../models/reservation-models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly endPoint = END_POINTS.rooms;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<RoomDto> {
    return this.http.get<RoomDto>(`${this.endPoint}/${id}`);
  }

  getAll(): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(this.endPoint);
  }
}
