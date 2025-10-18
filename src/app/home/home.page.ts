import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonAvatar, IonIcon, IonSpinner, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, takeUntil, switchMap, catchError, of } from 'rxjs';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonAvatar, IonIcon, IonSpinner, IonLabel, CommonModule, FormsModule],
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
      this.atores = (response.results || [])
        .filter((ator: any) => ator.profile_path)
        .slice(0, 5);
      this.carregando = false;
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

  // Método para trackBy (otimização de performance)
  trackByActorId(index: number, ator: any): number {
    return ator.id;
  }
}
