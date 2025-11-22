// src/app/providers/services/students/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { END_POINTS } from '../../utils/end-points';
import { Observable } from 'rxjs';
import { StudentDto, CreateStudentDto, UpdateStudentDto } from '../../../models/student-models';
import { EntityDataService } from '../../utils/entity-data';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends EntityDataService<StudentDto> {

  constructor(protected override httpClient: HttpClient) {

    // Armado correcto de la URL final
    const baseUrl = environment.url.endsWith('/')
      ? environment.url.slice(0, -1)
      : environment.url;

    const endpoint = END_POINTS.students.startsWith('/')
      ? END_POINTS.students
      : '/' + END_POINTS.students;

    super(httpClient, `${baseUrl}${endpoint}`);
  }

  // Crear estudiante
  create(dto: CreateStudentDto): Observable<StudentDto> {
    return this.httpClient.post<StudentDto>(`${this.endPoint}`, dto);
  }

  // Actualizar estudiante
  updateStudent(id: number, dto: UpdateStudentDto): Observable<StudentDto> {
    return this.httpClient.put<StudentDto>(`${this.endPoint}/${id}`, dto);
  }

  // Activar / Desactivar estudiante
  toggleActive(id: number): Observable<StudentDto> {
    return this.httpClient.patch<StudentDto>(`${this.endPoint}/${id}/toggle-active`, {});
  }

  // Buscar por código de estudiante
  getByCode(code: string): Observable<StudentDto> {
    return this.httpClient.get<StudentDto>(`${this.endPoint}/code/${code}`);
  }
}
