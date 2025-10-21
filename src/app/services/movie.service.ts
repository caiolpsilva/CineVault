import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoFilme {
  private urlBase = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Busca ator por nome
  buscarAtor(nome: string): Observable<any> {
    return this.http.get(`${this.urlBase}/search/person?api_key=${environment.tmdbApiKey}&query=${nome}`);
  }

  // Busca créditos de filmes do ator
  obterCreditosFilme(idAtor: number): Observable<any> {
    return this.http.get(`${this.urlBase}/person/${idAtor}/movie_credits?api_key=${environment.tmdbApiKey}&language=pt-BR`);
  }

  // Busca detalhes do ator por ID
  obterDetalhesAtor(idAtor: number): Observable<any> {
    return this.http.get(`${this.urlBase}/person/${idAtor}?api_key=${environment.tmdbApiKey}&language=pt-BR`);
  }

  // Busca atores populares
  obterAtoresPopulares(): Observable<any> {
    return this.http.get(`${this.urlBase}/person/popular?api_key=${environment.tmdbApiKey}&language=pt-BR&page=1`);
  }

  // Busca filmes populares
  obterFilmesPopulares(): Observable<any> {
    return this.http.get(`${this.urlBase}/movie/popular?api_key=${environment.tmdbApiKey}&language=pt-BR&page=1`);
  }
}
