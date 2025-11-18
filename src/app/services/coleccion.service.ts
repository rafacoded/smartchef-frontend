import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ColeccionRecetaDTO } from '../models/coleccion.model';

@Injectable({
  providedIn: 'root',
})
export class ColeccionService {
  private readonly baseUrl = `${environment.apiUrl}/colecciones`;

  constructor(private http: HttpClient) {}

  obtenerColeccionesPorUsuario(idUsuario: number): Observable<ColeccionRecetaDTO[]> {
    return this.http
      .get<ColeccionRecetaDTO[]>(`${this.baseUrl}/usuario/${idUsuario}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  crearColeccion(payload: ColeccionRecetaDTO): Observable<ColeccionRecetaDTO> {
    return this.http
      .post<ColeccionRecetaDTO>(this.baseUrl, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  actualizarColeccion(id: number, payload: ColeccionRecetaDTO): Observable<ColeccionRecetaDTO> {
    return this.http
      .put<ColeccionRecetaDTO>(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  eliminarColeccion(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('ColeccionService error', error);
    return throwError(() => error);
  }
}
