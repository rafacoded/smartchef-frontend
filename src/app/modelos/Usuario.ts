export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  preferenciasAlimentarias?: string[];
  fechaRegistro?: string; // ISO string si lo mandas desde backend
  fotoPerfil?: string;
}
