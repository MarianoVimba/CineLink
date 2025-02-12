import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Puntaje } from '../interfaces/puntaje.interface';



@Injectable({
  providedIn: 'root'
})

export class PuntajeService {
  private urlBase = 'http://localhost:3000/puntajes';

  constructor(private http: HttpClient) { }

  guardarPuntaje(puntaje: Puntaje): Observable<Puntaje> {
    return this.http.post<Puntaje>(this.urlBase, puntaje);
  }

  obtenerPuntajes(): Observable<Puntaje[]> {
    return this.http.get<Puntaje[]>(this.urlBase);
  }

  obtenerPuntajePorUsuario(nombreUsuario: string): Observable<Puntaje[]> {
    return this.http.get<Puntaje[]>(`${this.urlBase}?nombreUsuario=${nombreUsuario}`);
  }

  // actualiza el puntaje de un usuario especifico
  actualizarPuntaje(puntaje: Puntaje): Observable<Puntaje> {
    return this.http.put<Puntaje>(`${this.urlBase}/${puntaje.id}`, puntaje);
  }

  // Obtiene los 5 puntajes más altos, ordenados de mayor a menor
  obtenerTopPuntajes(): Observable<Puntaje[]> {
    return this.http.get<Puntaje[]>(`${this.urlBase}?_sort=puntos&_order=desc&_limit=5`);
  }




}
