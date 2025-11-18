import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsuarioDTO } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly baseUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UsuarioDTO[]> {
    return this.http
      .get<UsuarioDTO[]>(this.baseUrl)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getUsuarioPorEmail(email: string): Observable<UsuarioDTO> {
    return this.http
      .get<UsuarioDTO>(`${this.baseUrl}/${email}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  actualizarUsuario(id: number, payload: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http
      .put<UsuarioDTO>(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('UsuarioService error', error);
    return throwError(() => error);
  }
}
