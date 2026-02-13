import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {AuthService} from "../../servicios/auth-service";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonInput, IonButton]
})
export class LoginPage {

  form = { email: '', password: '' };
  loading = false;

  constructor() {}

  private auth = inject(AuthService);
  private toast = inject(ToastController)

  private router = inject(Router);

  onSubmit() {
    if (!this.form.email || !this.form.password) return;

    this.loading = true;
    this.auth.login(this.form).subscribe({
      next: async () => {
        this.loading = false;
        const ok = await this.router.navigateByUrl('/tabs/home');

      },
      error: async (err) => {
        this.loading = false;
        const msg = err?.error?.message ?? 'Login incorrecto';
        const t = await this.toast.create({ message: msg, duration: 1500, position: 'bottom' });
        await t.present();
      }
    });
  }

  goRegister() {
    this.router.navigateByUrl('/register');
  }
}
