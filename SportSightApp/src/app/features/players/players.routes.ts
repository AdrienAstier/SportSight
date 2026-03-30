import { Routes } from '@angular/router';

export const playersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./player-list/player-list.component').then((m) => m.PlayerListComponent),
    title: 'Joueurs — SportSight',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./player-detail/player-detail.component').then((m) => m.PlayerDetailComponent),
    title: 'Joueur — SportSight',
  },
];
