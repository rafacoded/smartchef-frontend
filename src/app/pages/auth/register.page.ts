import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonText,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonList,
    IonText,
  ],
})
export class RegisterPage {
  errorMessages: string[] = [];
  isSubmitting = false;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get nombre() {
    return this.form.get('nombre');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    this.errorMessages = [];
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const payload = {
      nombre: this.nombre?.value ?? '',
      email: this.email?.value ?? '',
      password: this.password?.value ?? '',
    };
    this.authService.register(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessages = this.parseErrors(error);
      },
    });
  }

  private parseErrors(error: any): string[] {
    if (!error) {
      return ['Error desconocido'];
    }

    if (error.status === 0) {
      return ['No se pudo conectar con el servidor.'];
    }

    if (error.status === 400 && error.error) {
      if (Array.isArray(error.error)) {
        return error.error;
      }

      if (error.error.errors) {
        const validationErrors = Object.values(error.error.errors) as Array<
          string | string[]
        >;
        return validationErrors.reduce<string[]>(
          (all, current) => all.concat(current),
          []
        );
      }

      if (typeof error.error === 'string') {
        return [error.error];
      }

      if (error.error.message) {
        return [error.error.message];
      }
    }

    return ['Ocurrió un error al registrarse.'];
  }
}
