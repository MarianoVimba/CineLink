import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private http = inject(HttpClient);
  private baseURL = 'http://localhost:3000/usuarios';

  // Obtiene la lista de favoritos de un usuario especifico
  obtenerFavoritos(userId: string | null): Observable<number[]> {
    return this.http.get<Usuario>(`${this.baseURL}/${userId}`).pipe(
      map(usuario => usuario.listaFavoritos || [])
    );
  }

  // agrega un ID de pelicula a la lista de favoritos del usuario
  agregarFavorito(userId: string | null, peliculaId: number): Observable<Usuario> {
    return this.obtenerFavoritos(userId).pipe(
      switchMap(favoritos => {
        const nuevosFavoritos = [...favoritos, peliculaId];
        return this.http.patch<Usuario>(`${this.baseURL}/${userId}`, { listaFavoritos: nuevosFavoritos });
      })
    );
  }

  // elimina un ID de pelicula de la lista de favoritos del usuario
  eliminarFavorito(userId: string | null, peliculaId: number): Observable<Usuario> {
    return this.obtenerFavoritos(userId).pipe(
      switchMap(favoritos => {
        const nuevosFavoritos = favoritos.filter(id => id !== peliculaId);
        return this.http.patch<Usuario>(`${this.baseURL}/${userId}`, { listaFavoritos: nuevosFavoritos });
      })
    );
  }
}
