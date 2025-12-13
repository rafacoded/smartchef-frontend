import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then(
        (m) => m.routes),
  },
  {
    path: 'usuario',
    loadComponent: () =>
      import('./pages/usuario/usuario.page').then(
        m => m.UsuarioPage)
  },
  {
    path: 'historial',
    loadComponent: () =>
      import('./pages/historial/historial.page').then(
        m => m.HistorialPage)
  },
  {
    path: 'detalle-receta/:id',
    loadComponent: () =>
      import('./pages/detalle-receta/detalle-receta.page').then(
        (m) => m.DetalleRecetaPage
      )
  },
  {
    path: 'detalle-lista/:id',
    loadComponent: () =>
      import('./pages/detalle-lista/detalle-lista.page')
        .then(m => m.DetalleListaPage)
  }


];
