import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RespuestaGeneros, Genero } from '../interfaces/genero.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private apiUrl = 'https://api.themoviedb.org/3/genre/movie/list';
  private apiKey = '43599da22af9abeb763c46dae25030b9';

  constructor(private http: HttpClient) { }


  obtenerGeneros(): Observable<Genero[]> {
    return this.http.get<RespuestaGeneros>(`${this.apiUrl}?api_key=${this.apiKey}&language=es-ES`)
      .pipe(map(response => response.genres));
  }


}
