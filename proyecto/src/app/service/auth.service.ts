import { Injectable } from '@angular/core';

/**
 * Maneja el estado de sesión. La fuente de verdad es el `userId` persistido
 * en localStorage (así la sesión sobrevive a un refresh, a diferencia del
 * booleano en memoria que había antes).
 *
 * NOTA: esto sigue siendo una sesión "de mentira" adecuada para json-server.
 * Una app real necesita un backend que devuelva un token (JWT) firmado y un
 * interceptor HTTP que lo adjunte; el guard no debe confiar en algo que el
 * propio cliente puede escribir.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userKey = 'userId';

  logIn(userId: string): void {
    localStorage.setItem(this.userKey, userId);
  }

  logOut(): void {
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userKey);
  }
}
