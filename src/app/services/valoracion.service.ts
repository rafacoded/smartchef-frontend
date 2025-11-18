import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ValoracionRecetaDTO } from '../models/valoracion.model';

@Injectable({
  providedIn: 'root',
})
export class ValoracionService {
  private readonly baseUrl = `${environment.apiUrl}/valoraciones`;

  constructor(private http: HttpClient) {}

  obtenerValoracionesPorReceta(idReceta: number): Observable<ValoracionRecetaDTO[]> {
    return this.http
      .get<ValoracionRecetaDTO[]>(`${this.baseUrl}/receta/${idReceta}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  crearValoracion(payload: ValoracionRecetaDTO): Observable<ValoracionRecetaDTO> {
    return this.http
      .post<ValoracionRecetaDTO>(this.baseUrl, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('ValoracionService error', error);
    return throwError(() => error);
  }
}
