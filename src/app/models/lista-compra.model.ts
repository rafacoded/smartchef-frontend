export interface ListaCompraDTO {
  idLista: number;
  nombreLista: string;
  descripcion: string;
  activa: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
  idUsuario: number;
  idRecetaOrigen?: number | null;
}
