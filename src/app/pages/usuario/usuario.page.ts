import { Component, inject, OnInit } from '@angular/core';
import { IonicModule, ToastController } from "@ionic/angular";
import {
  barChartOutline, calendarOutline, cameraOutline, documentTextOutline,
  logOutOutline, moonOutline, notificationsOutline, settingsOutline,
} from 'ionicons/icons';
import { addIcons } from "ionicons";
import { CommonModule, DatePipe } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { UsuarioService } from 'src/app/servicios/usuario-service';
import { AuthService } from 'src/app/servicios/auth-service';
import { Usuario } from 'src/app/modelos/Usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
  providers: [DatePipe]
})
export class UsuarioPage implements OnInit {

  private toastCtrl = inject(ToastController);
  private usuarioService = inject(UsuarioService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private datePipe = inject(DatePipe);

  user?: Usuario;

  // UI
  username = '...';
  userSince = '...';
  avatar = 'assets/resources/usuario.png';

  constructor() {
    addIcons({
      logOutOutline, settingsOutline, calendarOutline, documentTextOutline,
      barChartOutline, notificationsOutline, cameraOutline, moonOutline
    });
  }

  ngOnInit() {
    this.usuarioService.getMe().subscribe({
      next: (u) => {
        this.user = u;
        this.username = u.nombre ?? u.email ?? 'Usuario';

        if (u.fechaRegistro) {
          this.userSince = this.datePipe.transform(u.fechaRegistro, 'MMMM y') ?? '—';
        } else {
          this.userSince = '—';
        }

        if (u.fotoPerfil) this.avatar = u.fotoPerfil;
      },
      error: async () => {
        await this.showToast('No se pudo cargar tu perfil (sesión?)');
        this.router.navigateByUrl('/login');
      }
    });
  }

  onAvatarChange(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        this.avatar = reader.result as string;
        await this.showToast('Foto de perfil actualizada');
      };
      reader.readAsDataURL(file);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }

  async logout() {
    this.auth.logout();
    await this.showToast('Sesión cerrada');
    await this.router.navigateByUrl('/login');
  }
}
