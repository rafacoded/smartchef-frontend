import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Receta, RecetaCrear} from "../modelos/Receta";
import {Observable} from "rxjs";
import {AsociarIngrediente} from "../modelos/AsociarIngrediente";

@Injectable({
  providedIn: 'root'
})

export class RecetaService {

  private apiUrl = "/api"

  private http = inject(HttpClient);

  constructor() { }

  listarRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl + "/recetas")
  }

  obtenerPorId(id: number): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/recetas/${id}`);
  }

  crearReceta(receta : RecetaCrear): Observable<Receta> {
    return this.http.post<Receta>(this.apiUrl + "/recetas", receta)
  }

  asociarIngrediente(asociacion : AsociarIngrediente) {
    return this.http.put("/api/acuario/planta/vincular", asociacion)
  }

  eliminar(id:number) {
    return this.http.delete(this.apiUrl + "/recetas/" + id)
  }
}
