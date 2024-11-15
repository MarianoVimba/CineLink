import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlBase = 'http://localhost:3000/usuarios'; // URL base del servidor JSON

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlBase);
  }

  getUsuarioById(id: string | null): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlBase}/${id}`);
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlBase, usuario);
  }

  updateUsuario(id: string | null, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.urlBase}/${id}`, usuario);
  }

  // solucion de id una vez ingresado para poder obtenerlo para poder trabajar con ese id

login(nombreUsuario: string, password: string): Observable<Usuario | null> {
  return this.http.get<Usuario[]>(`${this.urlBase}?nombreUsuario=${nombreUsuario}&password=${password}`).pipe(
    map(usuarios => {
      if (usuarios.length > 0) {
        localStorage.setItem('userId', String(usuarios[0].id)); // convertir el ID a cadena
        return usuarios[0];
      } else {
        return null;
      }
    })
  );
}



}
