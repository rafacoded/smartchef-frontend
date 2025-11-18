export interface RecetaDTO {
  idReceta: number;
  titulo: string;
  descripcion: string;
  pasos: string;
  tiempoPreparacion: number;
  dificultad: string;
  categoria: string;
  imagen?: string;
  autorId?: number;
}
