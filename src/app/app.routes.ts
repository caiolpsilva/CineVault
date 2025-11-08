import { Routes } from '@angular/router';
import { PaginaDetalhesAtor } from './detalhes-ator/detalhes-ator.page';
import { PaginaInicial } from './home/home.page';

export const routes: Routes = [
  {
    path: 'home',
    component: PaginaInicial,
  },
  {
    path: 'detalhes-ator/:id',
    component: PaginaDetalhesAtor,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detalhes-ator',
    component: PaginaDetalhesAtor,
  },
];
