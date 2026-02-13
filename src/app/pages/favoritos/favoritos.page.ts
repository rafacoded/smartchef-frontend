import {Component, inject, OnInit} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../components/header/header.component";
import {GuardadoRecetaService} from "../../servicios/guardado-receta-service";
import {GuardadoReceta} from "../../modelos/GuardadoReceta";
import {RecetaCardComponent} from "../../components/receta-card/receta-card.component";
import {Receta} from "../../modelos/Receta";

@Component({
  selector: 'app-favoritos',
  templateUrl: 'favoritos.page.html',
  styleUrls: ['favoritos.page.scss'],
  standalone: true,
  imports: [IonContent, HeaderComponent, IonList, IonItem, IonLabel, RecetaCardComponent,],
})
export class FavoritosPage implements OnInit{
  constructor() {}

  private service = inject(GuardadoRecetaService);

  favoritos: Receta[] = [];
  loading = true;


  ngOnInit() {
    this.service.obtenerMisFavoritos().subscribe({
      next: (data) => {
        // data: GuardadoRecetaResponseDTO[]
        this.favoritos = data.map(g => g.receta as unknown as Receta);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando favoritos', err);
        this.loading = false;
      }
    });
  }
}
