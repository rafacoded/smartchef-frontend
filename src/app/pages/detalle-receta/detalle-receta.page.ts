import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonChip,
  IonContent,
  IonHeader, IonIcon, IonItem, IonLabel, IonList, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { ActivatedRoute } from "@angular/router";
import { RecetaService } from "../../servicios/receta-service";
import {Receta} from "../../modelos/Receta";
import {addIcons} from "ionicons";
import { timeOutline } from "ionicons/icons";

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonList, IonItem, IonLabel, IonIcon, IonChip, IonText]
})
export class DetalleRecetaPage implements OnInit {

  constructor() {
    addIcons({ timeOutline })
  }

  private route = inject(ActivatedRoute);
  private recetaService = inject(RecetaService);

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
}
