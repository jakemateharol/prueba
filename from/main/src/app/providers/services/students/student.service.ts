// src/app/providers/services/student/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { END_POINTS } from '../../utils/end-points';
import { Observable } from 'rxjs';

export interface StudentDto {
  id: number;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = `${environment.url}${END_POINTS.students}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(this.url);
  }

  getById(id: number): Observable<StudentDto> {
    return this.http.get<StudentDto>(`${this.url}/${id}`);
  }
}
