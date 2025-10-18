import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonBackButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DiretivaDestacar } from '../diretivas/highlight.directive';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.page.html',
  styleUrls: ['./actor-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonSpinner, IonIcon, CommonModule, FormsModule, DiretivaDestacar]
})
export class ActorDetailsPage implements OnInit {
  nomeAtor: string = '';
  ator: any = null;
  filmes: any[] = [];
  carregando: boolean = true;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buscarAtorPorId(+id);
    }
  }

  // Busca ator por ID
  buscarAtorPorId(actorId: number) {
    this.carregando = true;
    this.movieService.getActorDetails(actorId).subscribe({
      next: (response) => {
        this.ator = response;
        this.buscarCreditosFilmes(actorId);
      },
      error: (error) => {
        console.error('Erro ao buscar ator:', error);
        this.carregando = false;
      }
    });
  }

  // Busca créditos de filmes do ator
  buscarCreditosFilmes(actorId: number) {
    this.movieService.getMovieCredits(actorId).subscribe({
      next: (response) => {
        this.filmes = (response.cast || [])
          .filter((movie: any) => movie.poster_path) // Filtrar apenas filmes com poster
          .sort((a: any, b: any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar filmes:', error);
        this.filmes = [];
        this.carregando = false;
      }
    });
  }

  // Método para trackBy (otimização de performance)
  trackByMovieId(index: number, movie: any): number {
    return movie.id;
  }
}
