import { Component, EventEmitter, inject, Input, OnChanges, output, Output, SimpleChanges } from '@angular/core';
import { ReseniaService } from '../../../service/resenia.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { reseña } from '../../../interfaces/reseña.interface';

@Component({
  selector: 'app-agregar-resenia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-resenia.component.html',
  styleUrl: './agregar-resenia.component.css'
})
export class AgregarReseniaComponent implements OnChanges {


  usuarioId: string | null  = localStorage.getItem('userId');
  @Input() peliculaId!: number;
  @Output() eventCrearResenia = new EventEmitter()


  fb = inject(FormBuilder);
  servicioResenia = inject(ReseniaService);

  ngOnChanges(changes: SimpleChanges): void {


    // if (changes['peliculaId'] || changes['usuarioId']) {
    //   this.formulario.patchValue({
    //     idPelicula: this.peliculaId,
    //     idUsuario: this.usuarioId
    //   });
    // }

    if (changes['peliculaId'] && this.peliculaId) {
      this.formulario.patchValue({
        idPelicula: this.peliculaId,  // Se actualiza solo este campo
        idUsuario: this.usuarioId,     // Esto también se actualiza en caso de que sea necesario
        puntuacion: 1,                 // Asigna valores por defecto si lo deseas
        descripcion: ''
      });
    }
  }



  formulario = this.fb.nonNullable.group({

    idPelicula:[this.peliculaId],
    puntuacion: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    descripcion: ['',[]],
    idUsuario:[this.usuarioId]

  })

  abrirModal(){
    const modal = document.getElementById('reseniaModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';  // Asegúrate de que el modal se muestra
      document.body.style.overflow = 'hidden';  // Para evitar el desplazamiento de la página
    }
  }

  cerrarModal() {
    const modal = document.getElementById('reseniaModal');
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
    }

    // Quitar backdrop manualmente
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    // Habilitar el scroll de la página
    document.body.style.overflow = 'auto';  // Restaurar el estilo de overflow
    document.body.style.paddingRight = '';

    //limpio el formulario
    this.formulario.reset({
      puntuacion: 1,
      descripcion: '',
      idUsuario: this.usuarioId,
      idPelicula: this.peliculaId  // Mantén el idPelicula al reiniciar el formulario
    });
  }


  guardarResenia(){

    if (this.formulario.valid) {

      const nuevaResenia = this.formulario.getRawValue();

          this.cerrarModal();
          return this.eventCrearResenia.emit(nuevaResenia);
      }
    }



    }

















