import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/Usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);

  getMe(): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/usuarios/perfil`);
  }
}
