import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HistorialCocinaDTO } from '../models/historial.model';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private readonly baseUrl = `${environment.apiUrl}/historial`;

  constructor(private http: HttpClient) {}

  obtenerHistorialPorUsuario(idUsuario: number): Observable<HistorialCocinaDTO[]> {
    return this.http
      .get<HistorialCocinaDTO[]>(`${this.baseUrl}/usuario/${idUsuario}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  crearRegistro(payload: HistorialCocinaDTO): Observable<HistorialCocinaDTO> {
    return this.http
      .post<HistorialCocinaDTO>(this.baseUrl, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HistorialService error', error);
    return throwError(() => error);
  }
}
