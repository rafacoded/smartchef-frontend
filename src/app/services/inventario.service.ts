import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { InventarioUsuarioDTO } from '../models/inventario.model';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private readonly baseUrl = `${environment.apiUrl}/inventario`;

  constructor(private http: HttpClient) {}

  obtenerInventarioPorUsuario(idUsuario: number): Observable<InventarioUsuarioDTO[]> {
    return this.http
      .get<InventarioUsuarioDTO[]>(`${this.baseUrl}/usuario/${idUsuario}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  crearInventario(payload: InventarioUsuarioDTO): Observable<InventarioUsuarioDTO> {
    return this.http
      .post<InventarioUsuarioDTO>(this.baseUrl, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  actualizarInventario(id: number, payload: InventarioUsuarioDTO): Observable<InventarioUsuarioDTO> {
    return this.http
      .put<InventarioUsuarioDTO>(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  eliminarInventario(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('InventarioService error', error);
    return throwError(() => error);
  }
}
