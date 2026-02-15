import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  IonBackButton, IonButton,
  IonButtons, IonCheckbox, IonChip,
  IonContent, IonHeader, IonIcon,
  IonItem, IonLabel, IonList,
  IonModal, IonNote,
  IonTitle, IonToolbar
} from '@ionic/angular/standalone';

import { ActivatedRoute, Router } from "@angular/router";
import { RecetaService } from "../../servicios/receta-service";
import {Receta} from "../../modelos/Receta";
import {addIcons} from "ionicons";
import {addCircleOutline, cartOutline, chevronBackOutline,timeOutline, qrCodeOutline, cameraOutline} from "ionicons/icons";
import {ToastController} from "@ionic/angular";
import {QrGeneratorService} from "../../servicios/qrgenerator-service";
import {QrService} from "../../servicios/qr-service";

import {GuardadoRecetaService} from "../../servicios/guardado-receta-service";

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonList, IonItem, IonLabel, IonIcon, IonChip, IonButton, IonNote, IonCheckbox, IonModal]
})
export class DetalleRecetaPage implements OnInit {

  constructor() {
    addIcons({ timeOutline, chevronBackOutline, addCircleOutline, cartOutline, qrCodeOutline, cameraOutline })
  }

  private qrGen = inject(QrGeneratorService);
  private toast = inject(ToastController);


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
        next: data => {
          this.receta = data;
        },
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

  // FUNCIONALIDAD QR

  // QR UTILS

  modalQrOpen = false;
  modalScanOpen = false;

  qrData = '';
  qrImgSrc = '';

  async abrirModalQR() {

    if (!this.receta?.idReceta) {
      console.warn('[QR] no hay receta.idReceta aún');
      await this.showToast('Aún no hay receta cargada 😅');
      return;
    }

    this.qrData = `${environment.appUrl}/detalle-receta/${this.receta.idReceta}?fav=1`;

    try {
      this.qrImgSrc = await this.qrGen.toDataUrl(this.qrData);
      this.modalQrOpen = true;
    } catch (e) {
      await this.showToast('Error generando QR');
    }
  }

  private async showToast(message: string) {
    const t = await this.toast.create({
      message,
      duration: 1500,
      position: 'bottom'
    });
    await t.present();
  }




}
