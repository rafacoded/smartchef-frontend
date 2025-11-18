import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IngredienteGlobalDTO } from '../models/ingrediente-global.model';

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  private readonly baseUrl = `${environment.apiUrl}/ingredientes`;

  constructor(private http: HttpClient) {}

  obtenerIngredientes(): Observable<IngredienteGlobalDTO[]> {
    return this.http
      .get<IngredienteGlobalDTO[]>(this.baseUrl)
      .pipe(catchError((error) => this.handleError(error)));
  }

  crearIngrediente(payload: IngredienteGlobalDTO): Observable<IngredienteGlobalDTO> {
    return this.http
      .post<IngredienteGlobalDTO>(this.baseUrl, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  buscarPorNombre(nombre: string): Observable<IngredienteGlobalDTO> {
    return this.http
      .get<IngredienteGlobalDTO>(`${this.baseUrl}/nombre/${nombre}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  buscarPorCategoria(categoria: string): Observable<IngredienteGlobalDTO[]> {
    return this.http
      .get<IngredienteGlobalDTO[]>(`${this.baseUrl}/categoria/${categoria}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('IngredienteService error', error);
    return throwError(() => error);
  }
}
