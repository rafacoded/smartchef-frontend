import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthService} from "./auth-service";
import {GuardadoReceta} from "../modelos/GuardadoReceta";

@Injectable({ providedIn: 'root' })
export class GuardadoRecetaService {

  private http = inject(HttpClient)

  private auth = inject(AuthService);

  constructor() {}

  guardarReceta(idReceta: number): Observable<any> {
    const idUsuario = this.auth.getUserId();

    if (!idUsuario) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    return this.http.post(
      `${environment.apiUrl}/usuarios/${idUsuario}/guardado/${idReceta}`,
      {}
    );
}
  obtenerMisFavoritos(): Observable<GuardadoReceta[]> {
    return this.http.get<GuardadoReceta[]>(`${environment.apiUrl}/mis-favoritos`);
  }
}
