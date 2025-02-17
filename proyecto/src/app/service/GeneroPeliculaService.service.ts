import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Pelicula } from '../interfaces/pelicula.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneroPeliculaService {

  private URL = 'https://api.themoviedb.org/3/discover/movie';
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzU5OWRhMjJhZjlhYmViNzYzYzQ2ZGFlMjUwMzBiOSIsIm5iZiI6MTczMTAzOTUwMi4xMzc4MDc2LCJzdWIiOiI2NzFiMjE0ODQyN2M1YzE5ZjAyNWUwMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7BgIP38YGpVReuZJO6j8sREDQ0YCcUDXxTZ_oifDtTQ';
  private headers = { Authorization: `Bearer ${this.apiKey}` };

  constructor(private http: HttpClient) { }

  buscarPeliculasPorGenero(generoId: number): Observable<Pelicula[]> {
    const url = `${this.URL}?include_adult=true&include_video=false&language=es-ES&page=1&sort_by=vote_count.desc&with_genres=${generoId}`;

    return this.http.get<{ results: Pelicula[] }>(url, { headers: this.headers }).pipe(
      map(response => response.results),
      catchError(() => of([])) // Si hay error, retorna un array vacío
    );
  }
}
