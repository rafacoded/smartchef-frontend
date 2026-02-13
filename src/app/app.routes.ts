import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // arranque a login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // auth público
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage)
  },

  // tabs protegido (aquí cuelgan home/buscar/etc)
  {
    path: 'tabs',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then(m => m.routes),
  },

  // tus otras rutas (si quieres protegerlas también, añade canActivate)

  {
    path: 'usuario',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/usuario/usuario.page').then(m => m.UsuarioPage)
  },
  {
    path: 'historial',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/historial/historial.page').then(m => m.HistorialPage)
  },
  {
    path: 'detalle-receta/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/detalle-receta/detalle-receta.page').then(m => m.DetalleRecetaPage)
  },
  {
    path: 'detalle-lista/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/detalle-lista/detalle-lista.page').then(m => m.DetalleListaPage)
  },

  { path: '**', redirectTo: 'login' }
];



