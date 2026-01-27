import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IngredienteGlobal } from "../modelos/IngredienteGlobal";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class IngredienteService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/api`;

  listar(q?: string) {
    const params = q ? { params: { q } } : {};
    return this.http.get<IngredienteGlobal[]>(`${this.apiUrl}/ingredientes`, params);
  }
}

