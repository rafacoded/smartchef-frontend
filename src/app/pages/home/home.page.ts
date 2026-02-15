import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonModal,
  IonItem, IonInput, IonSelect, IonSelectOption, IonButtons, IonList,
  IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonNote
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { readerOutline, addOutline, pencilOutline, trashOutline, qrCodeOutline } from 'ionicons/icons';
import {AlertController, IonicModule} from '@ionic/angular';

import { HeaderComponent } from '../../components/header/header.component';
import { Receta, RecetaCrear } from '../../modelos/Receta';
import { RecetaService } from '../../servicios/receta-service';
import { RecetaCardComponent } from '../../components/receta-card/receta-card.component';
import { ToastController } from '@ionic/angular';

import { IngredienteService } from '../../servicios/ingrediente-service';
import { IngredienteGlobal } from '../../modelos/IngredienteGlobal';
import {QrService} from "../../servicios/qr-service";
import {GuardadoRecetaService} from "../../servicios/guardado-receta-service";
import {Router} from "@angular/router";

type ModoModal = 'crear' | 'editar';

type RecetaDetalle = {
  idReceta: number;
  titulo: string;
  descripcion: string;
  tiempoPreparacion: number;
  dificultad: 'FACIL' | 'MEDIA' | 'DIFICIL';
  imagen?: string | null;
  pasos: { orden: number; descripcion: string }[];
  ingredientes: { idIngrediente: number; nombreIngrediente: string; cantidad: number; unidad: string }[];
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonIcon, IonToolbar, IonTitle, IonContent, HeaderComponent,
    IonButton, IonModal, IonItem, IonInput, FormsModule, IonSelect,
    IonSelectOption, IonButtons, IonList, RecetaCardComponent, IonLabel,
    IonGrid, IonRow, IonCol, IonNote
  ]
})
export class HomePage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  private recetaService = inject(RecetaService);
  private ingredienteService = inject(IngredienteService);
  private alertController = inject(AlertController);

  private qrService = inject(QrService);
  private guardadoRecetaService = inject(GuardadoRecetaService);
  private toast = inject(ToastController);
  private router = inject(Router);

  modalScanOpen = false;
  private scanning = false;

  protected recetas: Receta[] = [];

  protected ingredientesDisponibles: IngredienteGlobal[] = [];
  busquedaIngrediente = '';

  modoModal: ModoModal = 'crear';
  recetaEditandoId: number | null = null;

  pasos = [{ descripcion: '' }];

  protected formularioReceta: RecetaCrear = this.crearFormularioVacio();

  constructor() {
    addIcons({ readerOutline, trashOutline, pencilOutline, addOutline, qrCodeOutline });
  }

  ngOnInit() {
    this.cargarRecetas();
  }

  private crearFormularioVacio(): RecetaCrear {
    return {
      titulo: '',
      descripcion: '',
      tiempoPreparacion: null as any,
      dificultad: null,
      imagen: null,
      pasos: [],
      ingredientes: []
    };
  }

  async abrirCrear() {
    this.modoModal = 'crear';
    this.recetaEditandoId = null;
    this.formularioReceta = this.crearFormularioVacio();
    this.pasos = [{ descripcion: '' }];
    this.ingredientesDisponibles = [];
    this.busquedaIngrediente = '';
    await this.modal.present();
  }

  async abrirEditar(receta: Receta) {
    this.modoModal = 'editar';
    this.recetaEditandoId = receta.idReceta;

    this.recetaService.obtenerPorId(receta.idReceta).subscribe({
      next: async (detalle: any) => {
        const d: RecetaDetalle = detalle;

        this.formularioReceta = {
          titulo: d.titulo,
          descripcion: d.descripcion,
          tiempoPreparacion: d.tiempoPreparacion as any,
          dificultad: d.dificultad,
          imagen: d.imagen ?? null,
          pasos: [],
          ingredientes: d.ingredientes.map(i => ({
            idIngrediente: i.idIngrediente,
            nombre: i.nombreIngrediente,
            cantidad: i.cantidad,
            unidad: i.unidad as any
          }))
        };

        this.pasos = d.pasos?.length
          ? d.pasos
            .sort((a, b) => a.orden - b.orden)
            .map(p => ({ descripcion: p.descripcion }))
          : [{ descripcion: '' }];

        await this.modal.present();
      },
      error: err => console.error('Error obteniendo detalle receta', err)
    });
  }

  cancel() {
    this.formularioReceta = this.crearFormularioVacio();
    this.pasos = [{ descripcion: '' }];
    this.ingredientesDisponibles = [];
    this.busquedaIngrediente = '';
    this.modal.dismiss(null, 'cancel');
  }

  guardarReceta() {
    if (!this.formularioReceta.titulo?.trim()) return;
    if (!this.formularioReceta.descripcion?.trim()) return;
    if (!this.formularioReceta.dificultad) return;
    if (!this.formularioReceta.tiempoPreparacion) return;
    if (!this.formularioReceta.ingredientes?.length) return;
    if (!this.pasos?.length || !this.pasos.some(p => p.descripcion?.trim())) return;

    const dto: RecetaCrear = {
      ...this.formularioReceta,
      pasos: this.recopilarPasos()
    };

    if (this.modoModal === 'crear') {
      this.recetaService.crearReceta(dto).subscribe({
        next: () => {
          this.cancel();
          this.cargarRecetas();
        },
        error: err => console.error('Error al crear receta', err)
      });
      return;
    }

    if (!this.recetaEditandoId) return;

    this.recetaService.actualizarReceta(this.recetaEditandoId, dto).subscribe({
      next: () => {
        this.cancel();
        this.cargarRecetas();
      },
      error: err => console.error('Error al actualizar receta', err)
    });
  }

  cargarRecetas() {
    this.recetaService.listarRecetas().subscribe({
      next: data => (this.recetas = data),
      error: err => console.error('Error al cargar recetas', err)
    });
  }

  eliminarReceta(id: number) {
    this.recetaService.eliminar(id).subscribe({
      next: () => this.cargarRecetas(),
      error: err => console.error('Error al eliminar', err)
    });
  }

  async confirmarEliminar(id: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar receta',
      message: '¿Seguro que quieres eliminar esta receta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => this.eliminarReceta(id) }
      ]
    });
    await alert.present();
  }

  // PASOS (UI)
  agregarPaso() {
    this.pasos.push({ descripcion: '' });
  }

  recopilarPasos() {
    return this.pasos.map((p, index) => ({
      orden: index + 1,
      descripcion: (p.descripcion ?? '').trim()
    })).filter(p => p.descripcion.length > 0);
  }

  eliminarPaso(index: number) {
    if (this.pasos.length > 1) this.pasos.splice(index, 1);
  }

  // INGREDIENTES (UI)
  insertarIngrediente(ing: IngredienteGlobal) {
    const existe = this.formularioReceta.ingredientes.some(i => i.idIngrediente === ing.idIngrediente);
    if (existe) return;

    this.formularioReceta.ingredientes.push({
      idIngrediente: ing.idIngrediente,
      nombre: ing.nombre,
      cantidad: 0,
      unidad: 'GRAMO'
    } as any);

    this.busquedaIngrediente = '';
    this.ingredientesDisponibles = [];
  }

  buscarIngredientes() {
    this.ingredienteService.listar(this.busquedaIngrediente).subscribe({
      next: data => (this.ingredientesDisponibles = data),
      error: err => console.error('Error buscando ingredientes', err)
    });
  }

  eliminarIngrediente(idIngrediente: number) {
    this.formularioReceta.ingredientes =
      this.formularioReceta.ingredientes.filter(i => i.idIngrediente !== idIngrediente);
  }

  // QR Code functions

  abrirEscaner() {
    this.modalScanOpen = true;
  }

  async cerrarEscaner() {
    this.modalScanOpen = false;
    await this.qrService.stop();
  }

  async onScanDismiss() {
    await this.qrService.stop();
    this.scanning = false;
  }

  async onScanDidPresent() {
    if (this.scanning) return;
    this.scanning = true;

    const el = document.getElementById('qr-reader');
    console.log('[QR] qr-reader exists?', !!el);

    try {
      const decoded = await this.qrService.escanearQR('qr-reader');
      console.log('[QR] decoded:', decoded);

      await this.qrService.stop();
      this.modalScanOpen = false;
      this.scanning = false;

      await this.handleScannedValue(decoded);

    } catch (e: any) {
      console.error('[QR] scan error:', e);
      await this.qrService.stop();
      this.modalScanOpen = false;
      this.scanning = false;

      await this.showToast('Error escaneando: ' + (e?.message ?? e));
    }
  }

  private async handleScannedValue(value: string) {
    try {
      const url = new URL(value);

      const fav = url.searchParams.get('fav');
      const match = url.pathname.match(/\/detalle-receta\/(\d+)/);

      if (fav === '1' && match) {
        const idReceta = Number(match[1]);
        console.log('[QR] auto-fav receta:', idReceta);

        this.guardadoRecetaService.guardarReceta(idReceta).subscribe({
          next: async () => await this.showToast('Guardada en favoritos ⭐'),
          error: async (err) => {
            console.error('[QR] guardar error:', err);
            await this.showToast('Inicia sesión para guardar');
            this.router.navigateByUrl('/login');
          }
        });

        return;
      }

      await this.router.navigateByUrl(url.pathname + url.search);
      return;

    } catch {
      const id = Number(value);
      if (!Number.isNaN(id)) {
        await this.router.navigate(['/detalle-receta', id]);
      } else {
        await this.showToast('QR no reconocido');
      }
    }
  }

  private async showToast(message: string) {
    const t = await this.toast.create({ message, duration: 1500, position: 'bottom' });
    await t.present();
  }
}
