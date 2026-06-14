import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlBase = `${environment.apiBaseUrl}/usuarios`;

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

  updateUsuario(id: string | null, usuario: Partial<Usuario>): Observable<Usuario> {
    // Partial<Usuario>: solo se actualizan los campos que se pasen en la solicitud.
    return this.http.patch<Usuario>(`${this.urlBase}/${id}`, usuario);
  }

  // NOTA: con json-server no hay forma realmente segura de autenticar. Como mínimo
  // evitamos mandar la contraseña en la URL: filtramos por nombre de usuario y
  // comparamos la contraseña en memoria. La identidad de sesión la maneja AuthService.
  login(nombreUsuario: string, password: string): Observable<Usuario | null> {
    const params = `?nombreUsuario=${encodeURIComponent(nombreUsuario)}`;
    return this.http.get<Usuario[]>(`${this.urlBase}${params}`).pipe(
      map(usuarios => usuarios.find(u => u.password === password) ?? null)
    );
  }

  verificarNombreUsuarioExistente(nombreUsuario: string): Observable<boolean> {
    const params = `?nombreUsuario=${encodeURIComponent(nombreUsuario)}`;
    return this.http.get<Usuario[]>(`${this.urlBase}${params}`).pipe(
      map(usuarios => usuarios.length > 0)
    );
  }

  actualizarContraseña(id: string, nuevaContraseña: string): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.urlBase}/${id}`, {
      password: nuevaContraseña,
      confirmacionPassword: nuevaContraseña
    });
  }

  verificarUsuarioPorPalabraClave(nombreUsuario: string, palabraClave: string): Observable<Usuario | null> {
    const params = `?nombreUsuario=${encodeURIComponent(nombreUsuario)}`;
    return this.http.get<Usuario[]>(`${this.urlBase}${params}`).pipe(
      map(usuarios => usuarios.find(u => u.palabraClave === palabraClave) ?? null)
    );
  }
}
