import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reseña } from '../interfaces/reseña.interface';

@Injectable({
  providedIn: 'root'
})
export class ReseniaService {

  constructor() { }

  private urlBase = 'http://localhost:3000/resenias';
  private http = inject(HttpClient);


  getResenias(): Observable<reseña[]> {
    return this.http.get<reseña[]>(this.urlBase);
  }

  getReseniasByPelicula(idPelicula: number): Observable<reseña[]> {
    return this.http.get<reseña[]>(`${this.urlBase}?idPelicula=${idPelicula}`);
  }

  postResenia(resenia: reseña): Observable<reseña> {
    return this.http.post<reseña>(this.urlBase, resenia);
  }





}
