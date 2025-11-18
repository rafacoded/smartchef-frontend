import {Component, inject} from '@angular/core';
import {IonicModule, ToastController} from "@ionic/angular";
import {
  barChartOutline, calendarOutline,
  cameraOutline, documentTextOutline, logOutOutline, moonOutline, notificationsOutline, settingsOutline,
} from 'ionicons/icons';
import {addIcons} from "ionicons";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule]
})
export class UsuarioPage {
  private toastCtrl = inject(ToastController);
  // props de prueba
  username = 'Julián Martínez';
  userSince = 'abril 2025';
  avatar = 'assets/resources/usuario.png'; // Imagen por defecto

  constructor() {
    addIcons({logOutOutline, settingsOutline, calendarOutline, documentTextOutline, barChartOutline, notificationsOutline, cameraOutline, moonOutline})
  }

  // Cambiar imagen de perfil
  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result as string;
        this.showToast('Foto de perfil actualizada');
      };
      reader.readAsDataURL(file);
    }
  }

  // Mostrar mensaje breve
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }

  logout() {
    this.showToast('Sesión cerrada');
    // Aquí cambiar para limpiar tokens o navegar al login
  }

}
