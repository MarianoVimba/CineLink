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

  updateUsuario(id: string | null, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.urlBase}/${id}`, usuario);
  }
//Partial<Usuario> para indicar que no todos los campos del objeto Usuario son requeridos, y que solo se actualizaran los que se pasen en la solicitud.  


  // solucion de id una vez ingresado para poder obtenerlo para poder trabajar con ese id

  login(nombreUsuario: string, password: string): Observable<Usuario | null> {
    return this.http.get<Usuario[]>(`${this.urlBase}?nombreUsuario=${nombreUsuario}&password=${password}`).pipe(
      map(usuarios => {
        if (usuarios.length > 0) {
          const userId = String(usuarios[0].id);
          localStorage.setItem('userId', userId); // convertir el ID a cadena
          console.log('ID del usuario almacenado:', userId); // Verifica el ID almacenado
          return usuarios[0];
        } else {
          return null;
        }
      })
    );
  }

  verificarNombreUsuarioExistente(nombreUsuario: string): Observable<boolean> {
    return this.getUsuarios().pipe(
      map(usuarios => usuarios.some(usuario => usuario.nombreUsuario === nombreUsuario))
    );
  }


actualizarContraseña(id: string, nuevaContraseña: string): Observable<Usuario> {
  return this.http.patch<Usuario>(`${this.urlBase}/${id}`, {
    password: nuevaContraseña,
    confirmacionPassword: nuevaContraseña 
  });
}

verificarUsuarioPorPalabraClave(nombreUsuario: string, palabraClave: string): Observable<Usuario | null> {
  return this.http.get<Usuario[]>(`${this.urlBase}?nombreUsuario=${nombreUsuario}&palabraClave=${palabraClave}`).pipe(
    map(usuarios => {
      if (usuarios.length > 0) {
        const userId = String(usuarios[0].id);
        localStorage.setItem('userId', userId); // convertir el ID a cadena
        console.log('ID del usuario almacenado:', userId); // Verifica el ID almacenado
        return usuarios[0];
      } else {
        return null;
      }
    })
  );
}


}




