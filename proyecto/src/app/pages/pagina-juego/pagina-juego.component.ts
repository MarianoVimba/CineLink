import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TriviaComponent } from '../../juego/trivia/trivia.component';

@Component({
  selector: 'app-pagina-juego',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, TriviaComponent],
  templateUrl: './pagina-juego.component.html',
  styleUrl: './pagina-juego.component.css'
})
export class PaginaJuegoComponent {

  mostrarJuego = false; // Variable para controlar la visibilidad del juego

  iniciarJuego() {
    this.mostrarJuego = true; // Cuando se presiona el botón, se muestra el juego
  }

}
