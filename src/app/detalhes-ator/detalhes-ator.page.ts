import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonBackButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DiretivaDestacar } from '../diretivas/highlight.directive';
import { PipeTruncar } from '../pipes/truncate.pipe';
import { ServicoFilme } from '../services/movie.service';

@Component({
  selector: 'app-detalhes-ator',
  templateUrl: './detalhes-ator.page.html',
  styleUrls: ['./detalhes-ator.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonSpinner, IonIcon, CommonModule, FormsModule, DiretivaDestacar, PipeTruncar]
})
export class PaginaDetalhesAtor implements OnInit {
  nomeAtor: string = '';
  ator: any = null;
  filmes: any[] = [];
  carregando: boolean = true;

  constructor(private route: ActivatedRoute, private servicoFilme: ServicoFilme) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buscarAtorPorId(+id);
    }
  }

  buscarAtorPorId(idAtor: number) {
    this.carregando = true;
    this.servicoFilme.obterDetalhesAtor(idAtor).subscribe({
      next: (response: any) => {
        this.ator = response;
        this.buscarCreditosFilmes(idAtor);
      },
      error: (error: any) => {
        console.error('Erro ao buscar ator:', error);
        this.carregando = false;
      }
    });
  }

  buscarCreditosFilmes(idAtor: number) {
    this.servicoFilme.obterCreditosFilme(idAtor).subscribe({
      next: (response: any) => {
        this.filmes = (response.cast || [])
          .filter((filme: any) => filme.poster_path)
          .sort((a: any, b: any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        this.carregando = false;
      },
      error: (error: any) => {
        console.error('Erro ao buscar filmes:', error);
        this.filmes = [];
        this.carregando = false;
      }
    });
  }

  trackByIdFilme(index: number, filme: any): number {
    return filme.id;
  }
}
