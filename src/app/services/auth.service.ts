import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { UsuarioDTO } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<UsuarioDTO | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap((response) => this.setToken(response.token)),
        catchError((error) => this.handleError(error))
      );
  }

  register(payload: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http
      .post<UsuarioDTO>(`${this.baseUrl}/register`, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setCurrentUser(user: UsuarioDTO | null): void {
    this.currentUserSubject.next(user);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private restoreSession(): void {
    const storedToken = this.getToken();
    if (storedToken) {
      this.currentUserSubject.next(this.currentUserSubject.value);
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error', error);
    return throwError(() => error);
  }
}
