import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonChip, IonIcon, IonLabel
} from "@ionic/angular/standalone";
import {Receta} from "../../modelos/Receta";
import {Router} from "@angular/router";

@Component({
  selector: 'app-receta-card',
  templateUrl: './receta-card.component.html',
  styleUrls: ['./receta-card.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonChip,
    IonLabel,
  ]
})
export class RecetaCardComponent{

  constructor() { }

  private router = inject(Router);

  @Input() receta!: Receta;
  @Output() eliminar = new EventEmitter<number>();

  onEliminar() {
    this.eliminar.emit(this.receta.idReceta);
  }

  getDificultadColor(dificultad: string) {
    switch (dificultad) {
      case "FACIL": return "success";
      case "MEDIA": return "warning";
      case "DIFICIL": return "danger";
      default: return "medium";
    }
  }
  verDetalle() {
    this.router.navigate(['/detalle-receta', this.receta.idReceta]);
  }

  @Output() editar = new EventEmitter<Receta>();

  onEditar(ev: Event) {
    ev.stopPropagation();
    this.editar.emit(this.receta);
  }

}
