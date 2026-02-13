import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'buscar',
        loadComponent: () =>
          import('../buscar/buscar.page').then((m) => m.BuscarPage),
      },
      {
        path: 'inventario',
        loadComponent: () =>
          import('../inventario/inventario.page').then((m) => m.InventarioPage),
      },
      {
        path: 'favoritos',
        loadComponent: () =>
          import('../favoritos/favoritos.page').then((m) => m.FavoritosPage),
      },
      {
        path: 'listas-compra',
        loadComponent: () =>
          import('../listas-compra/listas-compra.page')
            .then(m => m.ListasCompraPage)
      },
      {
        path: 'detalle-lista/:id',
        loadComponent: () =>
          import('../detalle-lista/detalle-lista.page').then((m) => m.DetalleListaPage),
      },

      { path: '', redirectTo: 'home', pathMatch: 'full' },

    ],
  },
];
