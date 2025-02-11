import { Component, OnInit } from '@angular/core';
import { Trivia } from '../../interfaces/trivia.interface';
import { TriviaService } from '../../service/trivia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css'
})
export class TriviaComponent implements OnInit {
  preguntas: Trivia[] = [];
  preguntaActual: Trivia | null = null;
  preguntaIndex = 0;
  respuestaSeleccionada: string | null = null;
  respuestaCorrecta: string | null = null;
  terminado = false;
  puntos = 0;
  tiempoInicio: number = 0;
  tiempoFinal: number = 0;
  tiempoTranscurrido: number = 0;
  @Output() ocultarTrivia = new EventEmitter<void>();

  constructor(private triviaService: TriviaService) { }

  ngOnInit(): void {
    this.triviaService.obtenerPreguntas().subscribe(preguntas => {
      this.preguntas = preguntas;
      this.cargarPregunta();
    });
    this.tiempoInicio = Date.now(); // Empezamos a contar el tiempo al iniciar el juego
  }

  cargarPregunta() {
    if (this.preguntas.length > 0) {
      this.preguntaActual = this.preguntas[this.preguntaIndex];
      this.respuestaSeleccionada = null;
      this.respuestaCorrecta = this.preguntaActual.respuesta;
      this.terminado = false;
    }
  }

  seleccionarRespuesta(opcion: string) {
    if (!this.respuestaSeleccionada) {
      this.respuestaSeleccionada = opcion;
      if (this.respuestaSeleccionada === this.respuestaCorrecta) {
        this.puntos += 5; // Sumar puntos por respuesta correcta
      }
    }
  }

  siguientePregunta() {
    if (this.preguntaIndex < this.preguntas.length - 1) {
      this.preguntaIndex++;
      this.cargarPregunta();
    } else {
      this.tiempoFinal = Date.now(); // Cuando termina el juego, se guarda el tiempo final
      this.tiempoTranscurrido = this.tiempoFinal - this.tiempoInicio;
      this.terminado = true;
      setTimeout(() => {
        // Al terminar el juego, ocultar la pregunta, imagen y opciones, y mostrar los resultados
      }, 3000); // Espera 3 segundos
    }
  }

  reiniciarTrivia() {
    this.preguntaIndex = 0;
    this.puntos = 0;
    this.tiempoInicio = Date.now();
    this.cargarPregunta();
    this.terminado = false;
  }

  volverInicio() {
    this.terminado = false;
    this.preguntaActual = null;
    this.ocultarTrivia.emit(); // Oculta el componente en la página
  }

  convertirTiempo(tiempoEnMilisegundos: number): string {
    const minutos = Math.floor(tiempoEnMilisegundos / 60000);
    const segundos = Math.floor((tiempoEnMilisegundos % 60000) / 1000);
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`; // Formato 'm:ss'
  }


}
