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

  // Método para obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlBase);
  }

  // Método para obtener un usuario por su ID
  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlBase}/${id}`);
  }

  // Método para agregar un nuevo usuario
  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlBase, usuario);
  }

  // Método para actualizar un usuario existente
  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.urlBase}/${id}`, usuario);
  }

    // Método para verificar el login
    login(nombreUsuario: string, password: string): Observable<Usuario | null> {
      return this.http.get<Usuario[]>(`${this.urlBase}?nombreUsuario=${nombreUsuario}&password=${password}`).pipe(
        map(usuarios => usuarios.length > 0 ? usuarios[0] : null)
      );
    }
}
