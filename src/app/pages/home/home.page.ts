import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  IonHeader, IonToolbar,
  IonTitle, IonContent,
  IonButton, IonModal, IonItem,
  IonInput, IonSelect, IonSelectOption,
  IonButtons, IonList, IonIcon
} from '@ionic/angular/standalone';

import {HeaderComponent} from "../../components/header/header.component";
import {Receta, RecetaCrear} from "../../modelos/Receta";
import {RecetaService} from "../../servicios/receta-service";
import {FormsModule} from "@angular/forms";

import {addIcons} from "ionicons";
import {addOutline, pencilOutline, trashOutline} from "ionicons/icons";
import {AlertController} from "@ionic/angular";
import {RecetaCardComponent} from "../../components/receta-card/receta-card.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonIcon, IonToolbar, IonTitle, IonContent, HeaderComponent, IonButton, IonModal, IonItem, IonInput, FormsModule, IonSelect, IonSelectOption, IonButtons, IonList, RecetaCardComponent,]
})
export class HomePage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  private recetaService = inject(RecetaService);

  private alertController = inject(AlertController);

  protected recetas: Receta[] = [];

  protected formularioReceta: RecetaCrear = {
    titulo : "",
    descripcion : "",
    tiempoPreparacion : 0,
    dificultad : "",
    pasos : [],
    imagen: "",

  };

  pasos = [{ descripcion: "" }];


  constructor() {
    addIcons({trashOutline, pencilOutline, addOutline })
  }

  ngOnInit() {
    this.cargarRecetas();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  crearReceta() {
    const dto = {
      ...this.formularioReceta,
      pasos: this.recopilarPasos()
    };
    this.recetaService.crearReceta(dto).subscribe({
      next: (data) => {
        console.log("Receta creada: ", data);
        this.cancel();
        this.cargarRecetas();
      },
      error: (err) => {
        console.error("Error al crear receta:", err);
      },
      complete: () => {
        console.log("Petición POST completada");
      }
    })
  }

  cargarRecetas() {
    this.recetaService.listarRecetas().subscribe({
      next: (data) => {
        this.recetas = data;
        },
      error: err => {
        console.error("Error al cargar recetas ", err);
      },
      complete: () => console.log('Recetas cargadas')
     })
  }

  eliminarReceta(id: number) {
    this.recetaService.eliminar(id).subscribe({
      next: () => {
        console.log("Receta eliminada");
        this.cargarRecetas();
      },
      error: (err) => console.error("Error al eliminar", err)
    });
  }

  async confirmarEliminar(id: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar receta',
      message: '¿Seguro que quieres elminar esta receta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.eliminarReceta(id);
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * PASOS
   */

  agregarPaso() {
    this.pasos.push({ descripcion: "" });
  }

  recopilarPasos() {
    return this.pasos.map((p, index) => ({
      orden: index + 1,
      descripcion: p.descripcion
    }));
  }

  eliminarPaso(index: number) {
    if (this.pasos.length > 1) {
      this.pasos.splice(index, 1);
    }
  }


}
