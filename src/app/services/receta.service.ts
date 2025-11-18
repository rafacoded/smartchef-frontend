import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { RecetaDTO } from '../models/receta.model';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private readonly baseUrl = `${environment.apiUrl}/recetas`;

  constructor(private http: HttpClient) {}

  obtenerRecetas(): Observable<RecetaDTO[]> {
    return this.http
      .get<RecetaDTO[]>(this.baseUrl)
      .pipe(catchError((error) => this.handleError(error)));
  }

  crearReceta(payload: RecetaDTO): Observable<RecetaDTO> {
    return this.http
      .post<RecetaDTO>(this.baseUrl, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  obtenerPorCategoria(categoria: string): Observable<RecetaDTO[]> {
    return this.http
      .get<RecetaDTO[]>(`${this.baseUrl}/categoria/${categoria}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  eliminarReceta(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('RecetaService error', error);
    return throwError(() => error);
  }
}
