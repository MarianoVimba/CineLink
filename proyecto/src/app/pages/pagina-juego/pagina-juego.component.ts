import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TriviaComponent } from '../../juego/trivia/trivia.component';
import { Puntaje } from '../../interfaces/puntaje.interface';
import { PuntajeService } from '../../service/puntaje.service';

@Component({
  selector: 'app-pagina-juego',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, TriviaComponent],
  templateUrl: './pagina-juego.component.html',
  styleUrl: './pagina-juego.component.css'
})
export class PaginaJuegoComponent implements OnInit {

  constructor(private puntajeService: PuntajeService) {}

  mostrarJuego = false; // Variable para controlar la visibilidad del juego
  topPuntajes: Puntaje[] = [];

  ngOnInit(): void {
    this.obtenerTopPuntajes(); // Al iniciar el componente, se cargan los puntajes
  }


  iniciarJuego() {
    this.mostrarJuego = true; // Cuando se presiona el botón, se muestra el juego
  }

  obtenerTopPuntajes(): void {
    this.puntajeService.obtenerTopPuntajes().subscribe({
      next: (puntajes) => {
        // Ordenar primero por puntaje (descendente) y luego por tiempo (ascendente) si hay empate
        this.topPuntajes = puntajes.sort((a, b) => {
          if (b.puntos === a.puntos) {
            // Si los puntajes son iguales, ordenamos por tiempo (ascendente)
            return a.tiempo - b.tiempo;
          } else {
            // Si los puntajes son diferentes, ordenamos por puntaje (descendente)
            return b.puntos - a.puntos;
          }
        });

        console.log('Top 5 Puntajes:', this.topPuntajes);
      },
      error: (e) => {
        console.error('Error al obtener los puntajes', e);
      }
    });
  }

  convertirTiempo(tiempoEnMilisegundos: number): string {
    const minutos = Math.floor(tiempoEnMilisegundos / 60000);
    const segundos = Math.floor((tiempoEnMilisegundos % 60000) / 1000);
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`; // Formato 'm:ss'
  }

}
