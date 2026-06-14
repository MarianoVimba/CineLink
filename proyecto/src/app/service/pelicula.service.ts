import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Pelicula } from '../interfaces/pelicula.interface';
import { Cartelera } from '../interfaces/cartelera.interface';
import { MovieDetails } from '../interfaces/details.interface';
import { Cast, Credits } from '../interfaces/credits.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private URL = environment.tmdb.baseUrl;
  private headers = { Authorization: `Bearer ${environment.tmdb.accessToken}` };
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


  buscarPeliculas(texto:string):Observable<Pelicula[]>{

    return this.http.get<Cartelera>(`${this.URL}/search/movie?query=${texto}&language=es-ES&page=1`,{headers:this.headers}).pipe(

      map(res=>res.results)
    )
  }


  getPeliculaById(id:string){

    return this.http.get<MovieDetails>(`${this.URL}/movie/${id}?language=es-ES`,{headers:this.headers}).pipe(

      catchError(err=> of(null))
    )
  }


  getPeliculaCreditos(id:string):Observable<Cast[] | null>{

    return this.http.get<Credits>(`${this.URL}/movie/${id}/credits?language=es-ES`,{headers:this.headers}).pipe(

      map(res=>res.cast),
      catchError(err=> of(null))
      )
  }






}
