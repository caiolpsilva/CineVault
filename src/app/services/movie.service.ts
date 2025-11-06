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

  buscarAtor(nome: string): Observable<any> {
    return this.http.get(`${this.urlBase}/search/person?api_key=${environment.tmdbApiKey}&query=${nome}`);
  }

  obterCreditosFilme(idAtor: number): Observable<any> {
    return this.http.get(`${this.urlBase}/person/${idAtor}/movie_credits?api_key=${environment.tmdbApiKey}&language=pt-BR`);
  }

  obterDetalhesAtor(idAtor: number): Observable<any> {
    return this.http.get(`${this.urlBase}/person/${idAtor}?api_key=${environment.tmdbApiKey}&language=pt-BR`);
  }

  obterAtoresPopulares(): Observable<any> {
    return this.http.get(`${this.urlBase}/person/popular?api_key=${environment.tmdbApiKey}&language=pt-BR&page=1`);
  }

  obterFilmesPopulares(): Observable<any> {
    return this.http.get(`${this.urlBase}/movie/popular?api_key=${environment.tmdbApiKey}&language=pt-BR&page=1`);
  }
}
