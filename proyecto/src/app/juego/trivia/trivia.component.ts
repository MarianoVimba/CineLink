import { Component, inject, OnInit } from '@angular/core';
import { Trivia } from '../../interfaces/trivia.interface';
import { TriviaService } from '../../service/trivia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Puntaje } from '../../interfaces/puntaje.interface';
import { PuntajeService } from '../../service/puntaje.service';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
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

  servicioUsuario = inject(UsuarioService);
  servicioPuntaje = inject(PuntajeService);

  usuarioId: string | null  = localStorage.getItem('userId');
  nombreUsuario: string | null = null;



  @Output() ocultarTrivia = new EventEmitter<void>();

  constructor(private triviaService: TriviaService) { }

  ngOnInit(): void {
    this.triviaService.obtenerPreguntas().subscribe(preguntas => {
      this.preguntas = preguntas;
      this.cargarPregunta();
    });
    this.tiempoInicio = Date.now(); // Empezamos a contar el tiempo al iniciar el juego

    this.obtnerNombreUsuario();

  }

  obtnerNombreUsuario() {
    if (this.usuarioId) {
      this.servicioUsuario.getUsuarioById(this.usuarioId).subscribe(usuario => {
        this.nombreUsuario = usuario.nombreUsuario ?? null; // Si 'nombre' es undefined, asigna null
        console.log("Nombre del usuario:", this.nombreUsuario);
      });
    }
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
      this.finalizarJuego();
      setTimeout(() => {}, 3000); // Espera 3 segundos antes de mostrar los resultados
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


  actualizarPuntaje(puntaje: Puntaje) {
    this.servicioPuntaje.actualizarPuntaje(puntaje).subscribe(() => {
      console.log('Puntaje actualizado con éxito:', puntaje);
    });
  }

  guardarNuevoPuntaje(puntaje: Puntaje) {
    this.servicioPuntaje.guardarPuntaje(puntaje).subscribe(() => {
      console.log('Nuevo puntaje guardado con éxito:', puntaje);
    });
  }

  private verificarYGuardarPuntaje(nombreUsuario: string, puntos: number, tiempo: number) {
    this.servicioPuntaje.obtenerPuntajePorUsuario(nombreUsuario).subscribe((puntajes) => {
      const puntajePrevio = puntajes.length > 0 ? puntajes[0] : null;

      if (!puntajePrevio || puntos > puntajePrevio.puntos) {
        const nuevoPuntaje = {
          id: puntajePrevio?.id, // Si existe un ID previo, se usa para actualizar
          nombreUsuario,
          puntos,
          tiempo
        };

        puntajePrevio
          ? this.actualizarPuntaje(nuevoPuntaje)
          : this.guardarNuevoPuntaje(nuevoPuntaje);
      } else {
        console.log('No se guardó el puntaje porque no es mayor al existente.');
      }
    });
  }



  finalizarJuego() {
    this.tiempoFinal = Date.now();
    this.tiempoTranscurrido = this.tiempoFinal - this.tiempoInicio;
    this.terminado = true;

    const nombreUsuario = this.nombreUsuario || 'Invitado';

    this.verificarYGuardarPuntaje(nombreUsuario, this.puntos, this.tiempoTranscurrido);
  }




}
