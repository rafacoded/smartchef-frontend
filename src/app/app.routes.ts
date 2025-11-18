import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'usuario',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/usuario/usuario.page').then((m) => m.UsuarioPage),
  },
  {
    path: 'historial',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/historial/historial.page').then((m) => m.HistorialPage),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
