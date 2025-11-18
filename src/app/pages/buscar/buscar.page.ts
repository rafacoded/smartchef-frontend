import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'app-buscar',
  templateUrl: 'buscar.page.html',
  styleUrls: ['buscar.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, HeaderComponent,]
})
export class BuscarPage {

  constructor() {}

}
