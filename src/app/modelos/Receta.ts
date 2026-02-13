import { IngredienteReceta } from "./IngredienteReceta";
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
  dificultad: 'FACIL' | 'MEDIA' | 'DIFICIL' | null;
  imagen: string | null;
  pasos: PasoReceta[];
  ingredientes: IngredienteReceta[];
}

export interface RecetaResumen {
  idReceta: number;
  titulo: string;
  imagen: string;
  categoria: string;
  dificultad: string;
}

