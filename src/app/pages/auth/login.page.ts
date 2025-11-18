import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage implements OnInit {
  errorMessages: string[] = [];
  isSubmitting = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tabs/home']);
    }
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
    const payload = this.form.value as { email: string; password: string };
    this.authService.login(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/tabs/home']);
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

    return ['Ocurrió un error al iniciar sesión.'];
  }
}
