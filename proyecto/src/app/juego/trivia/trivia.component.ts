import { Component, OnInit } from '@angular/core';
import { Trivia } from '../../interfaces/trivia.interface';
import { TriviaService } from '../../service/trivia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private triviaService: TriviaService) {}


  ngOnInit(): void {
    this.triviaService.obtenerPreguntas().subscribe(preguntas => {
      this.preguntas = preguntas;
      this.cargarPregunta();
    });
  }

  cargarPregunta() {
    if (this.preguntas.length > 0) {
      this.preguntaActual = this.preguntas[this.preguntaIndex];
      this.respuestaSeleccionada = null;
      this.respuestaCorrecta = this.preguntaActual.respuesta;
      this.terminado = false;
      console.log(this.preguntaActual.foto)
    }
  }

  seleccionarRespuesta(opcion: string) {
    if (!this.respuestaSeleccionada) { // Solo permite seleccionar una vez
      this.respuestaSeleccionada = opcion;
    }
  }


  siguientePregunta() {
    if (this.preguntaIndex < this.preguntas.length - 1) {
      this.preguntaIndex++;
      this.cargarPregunta();
    } else {
      this.terminado = true;
    }
  }


}
