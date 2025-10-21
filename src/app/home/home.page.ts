import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonSearchbar, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Subject, catchError, debounceTime, distinctUntilChanged, forkJoin, of, switchMap, takeUntil } from 'rxjs';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonAvatar, IonIcon, IonSpinner, IonButton, CommonModule, FormsModule],
})
export class HomePage implements OnInit, OnDestroy {
  nomeAtor: string = '';
  atores: any[] = [];
  carregando: boolean = false;




  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    // Configurar busca com debouncing
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      switchMap(query => {
        if (query.length >= 2) {
          this.carregando = true;
          return this.movieService.searchActor(query).pipe(
            catchError(error => {
              console.error('Erro na busca:', error);
              this.carregando = false;
              return of({ results: [] });
            })
          );
        } else {
          return of({ results: [] });
        }
      })
    ).subscribe(response => {
      const atoresComProfile = (response.results || [])
        .filter((ator: any) => ator.profile_path)
        .slice(0, 10); // Buscar mais para compensar filtros

      if (atoresComProfile.length > 0) {
        this.filtrarAtoresComFilmes(atoresComProfile);
      } else {
        this.atores = [];
        this.carregando = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Método chamado quando o usuário digita na barra de busca
  onSearchInput(event: any) {
    const query = event.target.value?.trim() || '';
    this.nomeAtor = query;
    this.searchSubject.next(query);
  }

  // Método para buscar atores (mantido para compatibilidade)
  buscarAtores() {
    if (this.nomeAtor.length >= 2) {
      this.carregando = true;
      this.movieService.searchActor(this.nomeAtor).subscribe({
        next: (response) => {
          this.atores = (response.results || [])
            .filter((ator: any) => ator.profile_path)
            .slice(0, 5);
          this.carregando = false;
        },
        error: (error) => {
          console.error('Erro ao buscar atores:', error);
          this.atores = [];
          this.carregando = false;
        }
      });
    } else {
      this.atores = [];
    }
  }

  // Método para selecionar um ator da lista
  selecionarAtor(ator: any) {
    if (ator && ator.id) {
      this.router.navigate(['/detalhes-ator', ator.id]);
    }
  }

  // Método para limpar a busca
  limparBusca() {
    this.nomeAtor = '';
    this.atores = [];
    this.carregando = false;
  }

  // Método para filtrar atores que têm filmes
  filtrarAtoresComFilmes(atores: any[]) {
    const creditRequests = atores.map(ator =>
      this.movieService.getMovieCredits(ator.id).pipe(
        catchError(() => of({ cast: [] }))
      )
    );

    forkJoin(creditRequests).subscribe((creditResponses: any[]) => {
      this.atores = atores
        .map((ator, index) => ({
          ...ator,
          hasMovies: (creditResponses[index].cast || [])
            .filter((movie: any) => movie.poster_path).length > 0
        }))
        .filter(ator => ator.hasMovies)
        .slice(0, 5);
      this.carregando = false;
    });
  }

  // Método para trackBy (otimização de performance)
  trackByActorId(index: number, ator: any): number {
    return ator.id;
  }



  // Método para rolar para a seção de busca
  rolarParaBusca() {
    const element = document.querySelector('.search-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
