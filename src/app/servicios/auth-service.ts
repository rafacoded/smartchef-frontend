import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../modelos/AuthModels';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  private http = inject(HttpClient);

  constructor() {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('idUsuario', String(res.idUsuario));
        localStorage.setItem('email', res.email);
        this.loggedIn$.next(true);
      })
    );
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('email');
    this.loggedIn$.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const raw = localStorage.getItem('idUsuario');
    return raw ? Number(raw) : null;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
