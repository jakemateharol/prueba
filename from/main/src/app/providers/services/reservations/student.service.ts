import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_POINTS } from '../../utils/end-points';
import { StudentDto } from '../../../models/reservation-models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly endPoint = END_POINTS.students;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<StudentDto> {
    return this.http.get<StudentDto>(`${this.endPoint}/${id}`);
  }

  getAll(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(this.endPoint);
  }
}
