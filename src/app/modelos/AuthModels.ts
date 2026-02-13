export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre?: string;   // ajusta a tu UsuarioDTO real
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  idUsuario: number;
  email: string;
}
