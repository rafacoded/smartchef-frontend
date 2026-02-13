export interface GuardadoReceta {
  idGuardado: number;
  fechaGuardado: string;
  usuario: {
    idUsuario: number;
    nombre: string;
  };
  receta: {
    idReceta: number;
    nombre: string;
    imagenUrl: string;
    dificultad: string;
  };
}
