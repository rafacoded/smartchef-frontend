import {Component, Input, } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {addIcons} from "ionicons";
import {personCircleOutline} from "ionicons/icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HeaderComponent {

  constructor() {
    addIcons({ personCircleOutline });

  }

  @Input() title: string = '';

}
