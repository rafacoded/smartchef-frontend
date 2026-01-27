export interface IngredienteReceta {
  idIngrediente: number;
  nombre: string;
  cantidad: number;
  unidad: 'GRAMO' | 'MILILITRO' | 'UNIDAD'| 'CUCHARADA' | 'TAZA';
}

