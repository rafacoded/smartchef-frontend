import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthService} from "../../servicios/auth-service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonInput, IonButton]
})
export class RegisterPage {
  form = { email: '', password: '', password2: '' };
  loading = false;

  constructor() {}

  private toast =  inject(ToastController);
  private router = inject(Router);
  private auth = inject(AuthService);


  async onSubmit() {
    if (this.form.password !== this.form.password2) {
      const t = await this.toast.create({ message: 'Las contraseñas no coinciden', duration: 1500 });
      await t.present();
      return;
    }

    this.loading = true;
    this.auth.register({ email: this.form.email, password: this.form.password }).subscribe({
      next: async () => {
        this.loading = false;
        const t = await this.toast.create({ message: 'Usuario creado ✅', duration: 1200 });
        await t.present();
        this.router.navigateByUrl('/login');
      },
      error: async (err) => {
        this.loading = false;
        const msg = err?.error?.message ?? 'No se pudo registrar';
        const t = await this.toast.create({ message: msg, duration: 1500 });
        await t.present();
      }
    });
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }
}
