// src/app/providers/utils/entity-data.ts
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class EntityDataService<T> {

  constructor(
    protected httpClient: HttpClient,
    protected endPoint: string
  ) {}

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.endPoint);
  }

  getById(id: number | string): Observable<T> {
    return this.httpClient.get<T>(`${this.endPoint}/${id}`);
  }

  add(entity: any): Observable<T> {
    return this.httpClient.post<T>(this.endPoint, entity);
  }

  update(id: number | string, entity: any): Observable<T> {
    return this.httpClient.put<T>(`${this.endPoint}/${id}`, entity);
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(`${this.endPoint}/${id}`);
  }
}
