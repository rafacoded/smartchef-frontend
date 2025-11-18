import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListaCompraDTO } from '../models/lista-compra.model';

@Injectable({
  providedIn: 'root',
})
export class ListaCompraService {
  private readonly baseUrl = `${environment.apiUrl}/listas`;

  constructor(private http: HttpClient) {}

  obtenerListasPorUsuario(idUsuario: number): Observable<ListaCompraDTO[]> {
    return this.http
      .get<ListaCompraDTO[]>(`${this.baseUrl}/usuario/${idUsuario}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  crearLista(payload: ListaCompraDTO): Observable<ListaCompraDTO> {
    return this.http
      .post<ListaCompraDTO>(this.baseUrl, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  actualizarLista(id: number, payload: ListaCompraDTO): Observable<ListaCompraDTO> {
    return this.http
      .put<ListaCompraDTO>(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  eliminarLista(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  actualizarEstado(id: number, activa: boolean): Observable<void> {
    return this.http
      .patch<void>(`${this.baseUrl}/${id}/estado`, { activa })
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('ListaCompraService error', error);
    return throwError(() => error);
  }
}
