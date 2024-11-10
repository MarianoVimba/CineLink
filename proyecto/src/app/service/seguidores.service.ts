import { UsuarioService } from './usuario.service';
import { Usuario } from './../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeguidoresService {

  private http = inject(HttpClient);
  private usuarioService = inject(UsuarioService);
  private baseURL = 'http://localhost:3000/usuarios';

  // Obtiene la lista de seguidos de un usuario específico
  obtenerSeguidos(userId: string | null): Observable<string[]> {
    return this.http.get<Usuario>(`${this.baseURL}/${userId}`).pipe(
      map(usuario => usuario.seguidos || [])
    );
  }

  id : string | null = null;

// Agrega un ID de usuario a la lista de seguidos del usuario
agregarSeguido(userId: string, seguidoId: string): Observable<Usuario> {
  return this.obtenerSeguidos(userId).pipe(
    switchMap(seguidos => {
      if (!seguidos.includes(seguidoId)) {
        const nuevosSeguidos = [...seguidos, seguidoId];
        // Actualizamos el seguido
        this.usuarioService.getUsuarioById(seguidoId).subscribe({
          next: (seguido: Usuario) => {
            if (!seguido.seguidores?.includes(userId)) {
              seguido.seguidores = [...(seguido.seguidores || []), userId];
              this.usuarioService.updateUsuario(seguidoId, seguido).subscribe();
            }
          },
          error: () => {
            console.log("Error al actualizar el seguido");
          }
        });
        //
        return this.http.patch<Usuario>(`${this.baseURL}/${userId}`, { seguidos: nuevosSeguidos });
      } else {
        return this.http.get<Usuario>(`${this.baseURL}/${userId}`); // Devuelve el usuario sin cambios
      }
    })
  );
}

// Elimina un ID de usuario de la lista de seguidos del usuario
eliminarSeguido(userId: string, seguidoId: string): Observable<Usuario> {
  return this.obtenerSeguidos(userId).pipe(
    switchMap(seguidos => {
      if (seguidos.includes(seguidoId)) {
        const nuevosSeguidos = seguidos.filter(id => id !== seguidoId);
        // Actualizamos el seguido
        this.usuarioService.getUsuarioById(seguidoId).subscribe({
          next: (seguido: Usuario) => {
            if (seguido.seguidores?.includes(userId)) {
              seguido.seguidores = seguido.seguidores.filter(id => id !== userId);
              this.usuarioService.updateUsuario(seguidoId, seguido).subscribe();
            }
          },
          error: () => {
            console.log("Error al actualizar el seguido");
          }
        });
        //
        return this.http.patch<Usuario>(`${this.baseURL}/${userId}`, { seguidos: nuevosSeguidos });
      } else {
        return this.http.get<Usuario>(`${this.baseURL}/${userId}`); // Devuelve el usuario sin cambios
      }
    })
  );
}

//para lista

  // Obtiene los detalles de los usuarios seguidos
  obtenerDetallesSeguidos(userId: string | null): Observable<Usuario[]> {
    return this.obtenerSeguidos(userId).pipe(
      switchMap(seguidosIds => {
        if (seguidosIds.length === 0) {
          return of([]); // Devuelve un array vacío si no hay seguidos
        }
        const observables = seguidosIds.map(id => this.usuarioService.getUsuarioById(id));
        return forkJoin(observables);
      })
    );
  }

    // Obtiene la lista de seguidores de un usuario específico
    obtenerSeguidores(userId: string | null): Observable<string[]> {
      return this.http.get<Usuario>(`${this.baseURL}/${userId}`).pipe(
        map(usuario => usuario.seguidores || [])
      );
    }
    
  // Obtiene los detalles de los usuarios seguidores
  obtenerDetallesSeguidores(userId: string | null): Observable<Usuario[]> {
    return this.obtenerSeguidores(userId).pipe(
      switchMap(seguidoresIds => {
        if (seguidoresIds.length === 0) {
          return of([]); // Devuelve un array vacío si no hay seguidores
        }
        const observables = seguidoresIds.map(id => this.usuarioService.getUsuarioById(id));
        return forkJoin(observables);
      })
    );
  }


}
