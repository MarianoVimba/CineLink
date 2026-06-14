import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RespuestaGeneros, Genero } from '../interfaces/genero.interface';
import { Pelicula } from '../interfaces/pelicula.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private url = environment.tmdb.baseUrl;
  private headers = { Authorization: `Bearer ${environment.tmdb.accessToken}` };

  constructor(private http: HttpClient) { }

  // Lista de géneros disponibles en TMDB
  obtenerGeneros(): Observable<Genero[]> {
    return this.http.get<RespuestaGeneros>(`${this.url}/genre/movie/list?language=es-ES`, { headers: this.headers })
      .pipe(map(response => response.genres));
  }

  // Películas de un género (antes vivía en GeneroPeliculaService, ya unificado aquí)
  buscarPeliculasPorGenero(generoId: number): Observable<Pelicula[]> {
    const url = `${this.url}/discover/movie?include_adult=true&include_video=false&language=es-ES&page=1&sort_by=vote_count.desc&with_genres=${generoId}`;
    return this.http.get<{ results: Pelicula[] }>(url, { headers: this.headers }).pipe(
      map(response => response.results),
      catchError(() => of([])) // Si hay error, retorna un array vacío
    );
  }
}
