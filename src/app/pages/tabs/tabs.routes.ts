import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
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
        path: 'compras',
        loadComponent: () =>
          import('../compra/compra.page').then((m) => m.CompraPage),
      },

    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
