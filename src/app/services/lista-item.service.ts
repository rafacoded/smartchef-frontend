import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListaItemDTO } from '../models/lista-item.model';

@Injectable({
  providedIn: 'root',
})
export class ListaItemService {
  private readonly baseUrl = `${environment.apiUrl}/lista-items`;

  constructor(private http: HttpClient) {}

  obtenerPorLista(idLista: number): Observable<ListaItemDTO[]> {
    return this.http
      .get<ListaItemDTO[]>(`${this.baseUrl}/lista/${idLista}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  crearItem(payload: ListaItemDTO): Observable<ListaItemDTO> {
    return this.http
      .post<ListaItemDTO>(this.baseUrl, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  actualizarItem(id: number, payload: ListaItemDTO): Observable<ListaItemDTO> {
    return this.http
      .put<ListaItemDTO>(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  eliminarItem(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('ListaItemService error', error);
    return throwError(() => error);
  }
}
