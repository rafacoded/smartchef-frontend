import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-detalle-lista',
  templateUrl: './detalle-lista.page.html',
  styleUrls: ['./detalle-lista.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalleListaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  items = [
    { id: 1, nombre: 'Tomate', cantidad: 2, unidad: 'kg', checked: false },
    { id: 2, nombre: 'Pan', cantidad: 1, unidad: 'ud', checked: true },
    { id: 3, nombre: 'Leche', cantidad: 2, unidad: 'L', checked: false }
  ];



}
