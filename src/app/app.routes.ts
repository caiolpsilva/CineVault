import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'detalhes-ator/:id',
    loadComponent: () => import('./detalhes-ator/actor-details.page').then((m) => m.ActorDetailsPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detalhes-ator',
    loadComponent: () => import('./detalhes-ator/actor-details.page').then( m => m.ActorDetailsPage)
  },
];
