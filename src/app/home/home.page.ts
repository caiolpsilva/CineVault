import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonSearchbar, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Subject, catchError, debounceTime, distinctUntilChanged, forkJoin, of, switchMap, takeUntil } from 'rxjs';
import { PipeTruncar } from '../pipes/truncate.pipe';
import { ServicoFilme } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonAvatar, IonIcon, IonSpinner, IonButton, CommonModule, FormsModule, PipeTruncar],
})
export class PaginaInicial implements OnInit, OnDestroy {
  nomeAtor: string = '';
  atores: any[] = [];
  carregando: boolean = false;

  private assuntoBusca = new Subject<string>();
  private destruir$ = new Subject<void>();

  constructor(private router: Router, private servicoFilme: ServicoFilme) {}

  ngOnInit() {
    this.assuntoBusca.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destruir$),
      switchMap((query: string) => {
        if (query.length >= 2) {
          this.carregando = true;
          return this.servicoFilme.buscarAtor(query).pipe(
            catchError((error: any) => {
              console.error('Erro na busca:', error);
              this.carregando = false;
              return of({ results: [] });
            })
          );
        } else {
          return of({ results: [] });
        }
      })
    ).subscribe((response: any) => {
      const atoresComProfile = (response.results || [])
        .filter((ator: any) => ator.profile_path)
        .slice(0, 10);

      if (atoresComProfile.length > 0) {
        this.filtrarAtoresComFilmes(atoresComProfile);
      } else {
        this.atores = [];
        this.carregando = false;
      }
    });
  }

  ngOnDestroy() {
    this.destruir$.next();
    this.destruir$.complete();
  }

  onSearchInput(event: any) {
    const query = event.target.value?.trim() || '';
    this.nomeAtor = query;
    this.assuntoBusca.next(query);
  }

  buscarAtores() {
    if (this.nomeAtor.length >= 2) {
      this.carregando = true;
      this.servicoFilme.buscarAtor(this.nomeAtor).subscribe({
        next: (response: any) => {
          this.atores = (response.results || [])
            .filter((ator: any) => ator.profile_path)
            .slice(0, 5);
          this.carregando = false;
        },
        error: (error: any) => {
          console.error('Erro ao buscar atores:', error);
          this.atores = [];
          this.carregando = false;
        }
      });
    } else {
      this.atores = [];
    }
  }

  selecionarAtor(ator: any) {
    if (ator && ator.id) {
      this.router.navigate(['/detalhes-ator', ator.id]);
    }
  }

  limparBusca() {
    this.nomeAtor = '';
    this.atores = [];
    this.carregando = false;
  }

  filtrarAtoresComFilmes(atores: any[]) {
    const requisicoesCreditos = atores.map(ator =>
      this.servicoFilme.obterCreditosFilme(ator.id).pipe(
        catchError(() => of({ cast: [] }))
      )
    );

    forkJoin(requisicoesCreditos).subscribe((respostasCreditos: any[]) => {
      this.atores = atores
        .map((ator, index) => ({
          ...ator,
          hasMovies: (respostasCreditos[index].cast || [])
            .filter((movie: any) => movie.poster_path).length > 0
        }))
        .filter(ator => ator.hasMovies)
        .slice(0, 5);
      this.carregando = false;
    });
  }

  trackByActorId(index: number, ator: any): number {
    return ator.id;
  }

  rolarParaBusca() {
    const element = document.querySelector('.container-busca');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
