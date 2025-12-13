import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton, IonButton,
  IonButtons, IonCheckbox, IonChip,
  IonContent,
  IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { ActivatedRoute } from "@angular/router";
import { RecetaService } from "../../servicios/receta-service";
import {Receta} from "../../modelos/Receta";
import {addIcons} from "ionicons";
import {addCircleOutline, cartOutline, chevronBackOutline, timeOutline} from "ionicons/icons";

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonList, IonItem, IonLabel, IonIcon, IonChip, IonButton, IonNote, IonCheckbox]
})
export class DetalleRecetaPage implements OnInit {

  constructor() {
    addIcons({ timeOutline, chevronBackOutline, addCircleOutline, cartOutline })
  }

  private route = inject(ActivatedRoute);
  private recetaService = inject(RecetaService);


  // TODO: sustituir por ingredientes reales del backend ASAP
  ingredientesMock = [
    { id: 1, nombre: 'Tomate', cantidad: 10, unidad: 'g' },
    { id: 2, nombre: 'Huevo', cantidad: 1, unidad: 'pc' },
    { id: 3, nombre: 'Rama de salvia', cantidad: 3, unidad: 'pc' },
    { id: 4, nombre: 'Jamón', cantidad: 3, unidad: 'pc' },
    { id: 5, nombre: 'Pan', cantidad: 3, unidad: 'pc' },
  ];


  receta!: Receta;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.recetaService.obtenerPorId(Number(id)).subscribe({
        next: data => this.receta = data,
        error: err => console.error("Error cargando receta", err)
      });
    }
  }

  mapDificultadColor(d: string) {
    switch (d) {
      case 'FACIL': return "success";
      case 'MEDIO': return "warning";
      case 'DIFICIL': return "danger";
      default: return "medium";
    }
  }

  getDificultadColor(dificultad: string) {
    switch (dificultad) {
      case "FACIL": return "success";
      case "MEDIA": return "warning";
      case "DIFICIL": return "danger";
      default: return "medium";
    }
  }



}
