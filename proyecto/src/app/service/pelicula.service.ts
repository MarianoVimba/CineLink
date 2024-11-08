import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Pelicula } from '../interfaces/pelicula.interface';
import { Cartelera } from '../interfaces/cartelera.interface';


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private URL='https://api.themoviedb.org/3';
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzU5OWRhMjJhZjlhYmViNzYzYzQ2ZGFlMjUwMzBiOSIsIm5iZiI6MTczMTAzOTUwMi4xMzc4MDc2LCJzdWIiOiI2NzFiMjE0ODQyN2M1YzE5ZjAyNWUwMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7BgIP38YGpVReuZJO6j8sREDQ0YCcUDXxTZ_oifDtTQ';
  private headers={Authorization:`Bearer ${this.apiKey}`};
  private cartelePage = 1;
  public cargando = false;

  constructor(private http: HttpClient) { }

  getCartelera():Observable<Pelicula[]>{

    if (this.cargando) {
      return of([]);
    }

    this.cargando=true;

    return this.http.get<Cartelera>(`${this.URL}/movie/now_playing?language=es-ES&page=${this.cartelePage}`,{headers:this.headers}).pipe( // para agarrar solo el array de objetos
      map((response:any)=> response.results),

      tap(()=>{
        this.cartelePage+=1;
        this.cargando=false;
      })
    )

  }











}
