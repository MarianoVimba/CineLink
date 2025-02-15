import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrailerService {

  private apiUrl = 'https://api.themoviedb.org/3/movie';
  private apiKey = '43599da22af9abeb763c46dae25030b9' ;

  constructor(private http: HttpClient) {}


  getMovieTrailer(movieId: number): Observable<string | null> {
    return this.http.get<{ results: any[] }>(`${this.apiUrl}/${movieId}/videos?api_key=${this.apiKey}`)
      .pipe(
        map(response => {
          const trailers = response.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube');
          return trailers.length > 0 ? `https://www.youtube.com/embed/${trailers[0].key}?autoplay=0&mute=1` : null;
        })
      );
  }


}
