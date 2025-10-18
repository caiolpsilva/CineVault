import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Busca ator por nome
  searchActor(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/person?api_key=${environment.tmdbApiKey}&query=${name}`);
  }

  // Busca créditos de filmes do ator
  getMovieCredits(actorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${actorId}/movie_credits?api_key=${environment.tmdbApiKey}&language=pt-BR`);
  }

  // Busca detalhes do ator por ID
  getActorDetails(actorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${actorId}?api_key=${environment.tmdbApiKey}&language=pt-BR`);
  }
}
