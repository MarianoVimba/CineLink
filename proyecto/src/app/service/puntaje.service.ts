import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Puntaje } from '../interfaces/puntaje.interface';
import { map } from 'rxjs/operators';

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
    return this.http.get<Puntaje[]>(this.urlBase).pipe(
      map((puntajes: Puntaje[]) =>
        puntajes
          .sort((a: Puntaje, b: Puntaje) => {
            if (b.puntos === a.puntos) {
              return a.tiempo - b.tiempo; // Menor tiempo primero si hay empate
            }
            return b.puntos - a.puntos; // Mayor puntaje primero
          })
          .slice(0, 5) // Tomar solo los 5 primeros
      )
    );
  }




}
