import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { END_POINTS } from '../../utils/end-points';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StudentDto, CreateStudentDto, UpdateStudentDto } from '../../../models/student-models';
import { EntityDataService } from '../../utils/entity-data';

@Injectable({
  providedIn: 'root',
})
export class StudentService extends EntityDataService<StudentDto> {

  constructor(protected override httpClient: HttpClient) {
    const baseUrl = environment.url.endsWith('/')
      ? environment.url.slice(0, -1)
      : environment.url;

    const endpoint = END_POINTS.students.startsWith('/')
      ? END_POINTS.students
      : '/' + END_POINTS.students;

    super(httpClient, `${baseUrl}${endpoint}`);
  }

  // Crear un estudiante
  create(dto: CreateStudentDto): Observable<StudentDto> {
    return this.httpClient.post<StudentDto>(`${this.endPoint}`, dto).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Actualizar estudiante
  updateStudent(id: number, dto: UpdateStudentDto): Observable<StudentDto> {
    return this.httpClient.put<StudentDto>(`${this.endPoint}/${id}`, dto).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Cambiar el estado activo/inactivo de un estudiante
  toggleActive(id: number): Observable<StudentDto> {
    return this.httpClient.patch<StudentDto>(`${this.endPoint}/${id}/toggle-active`, {}).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Obtener estudiante por código
  getByCode(code: string): Observable<StudentDto> {
    return this.httpClient.get<StudentDto>(`${this.endPoint}/code/${code}`).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Eliminar estudiante
  deleteStudent(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.endPoint}/${id}`).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Método para manejar errores en la API
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ha ocurrido un error inesperado';

    if (error.error instanceof ErrorEvent) {
      // Error en el lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error en el backend
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta, por favor verifica los datos.';
          break;
        case 404:
          errorMessage = 'Estudiante no encontrado';
          break;
        case 500:
          errorMessage = 'Error en el servidor, intenta nuevamente más tarde';
          break;
        default:
          errorMessage = `Error desconocido: ${error.message}`;
      }
    }

    // Lanza el error con un mensaje más amigable
    return throwError(() => new Error(errorMessage));
  }
}
