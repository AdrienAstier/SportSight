import { Routes } from '@angular/router';

export const teamsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./team-list/team-list.component').then((m) => m.TeamListComponent),
    title: 'Équipes — SportSight',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./team-detail/team-detail.component').then((m) => m.TeamDetailComponent),
    title: 'Équipe — SportSight',
  },
];
