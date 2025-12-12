import { PasoReceta } from "./PasoReceta";

export interface Receta {
  idReceta: number;
  titulo: string;
  descripcion: string;
  tiempoPreparacion: number;
  dificultad: string;
  categoria: string;
  imagen: string | null;
  pasos: PasoReceta[];
  preferencias: string[];
}

export interface RecetaCrear {
  titulo: string;
  descripcion: string;
  tiempoPreparacion: number;
  dificultad: string;
  pasos: PasoReceta[];
  imagen: string | null;
}
