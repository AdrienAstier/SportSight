import { Routes } from '@angular/router';

export const matchesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./match-list/match-list.component').then((m) => m.MatchListComponent),
    title: 'Matchs — SportSight',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./match-detail/match-detail.component').then((m) => m.MatchDetailComponent),
    title: 'Match — SportSight',
  },
];
