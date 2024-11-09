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

  // Obtiene la lista de favoritos de un usuario específico
  obtenerFavoritos(userId: string | null): Observable<number[]> {
    return this.http.get<Usuario>(`${this.baseURL}/${userId}`).pipe(
      map(usuario => usuario.listaFavoritos || [])
    );
  }

  // Agrega un ID de película a la lista de favoritos del usuario
  agregarFavorito(userId: string | null, peliculaId: number): Observable<Usuario> {
    return this.obtenerFavoritos(userId).pipe(
      switchMap(favoritos => {
        const nuevosFavoritos = [...favoritos, peliculaId];
        return this.http.patch<Usuario>(`${this.baseURL}/${userId}`, { listaFavoritos: nuevosFavoritos });
      })
    );
  }

  // Elimina un ID de película de la lista de favoritos del usuario
  eliminarFavorito(userId: string | null, peliculaId: number): Observable<Usuario> {
    return this.obtenerFavoritos(userId).pipe(
      switchMap(favoritos => {
        const nuevosFavoritos = favoritos.filter(id => id !== peliculaId);
        return this.http.patch<Usuario>(`${this.baseURL}/${userId}`, { listaFavoritos: nuevosFavoritos });
      })
    );
  }
}
