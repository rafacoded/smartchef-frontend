import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardHeader, IonCardSubtitle,
  IonCardTitle,
  IonContent,
} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../components/header/header.component";
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-listas-compra',
  templateUrl: './listas-compra.page.html',
  styleUrls: ['./listas-compra.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,]
})
export class ListasCompraPage {


  private readonly navController = inject(NavController);

  constructor() {}

  listasCompra = [
    { id: 1, nombre: 'Compra semanal', totalItems: 8 },
    { id: 2, nombre: 'Cena italiana', totalItems: 5 }
  ];

  abrirLista(idLista: number) {
    console.log('CLICK EN LISTA', idLista);
    this.navController.navigateForward(['/tabs/detalle-lista/', idLista]);
  }

}
