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


    if (changes['peliculaId'] && this.peliculaId) {
      this.formulario.patchValue({
        idPelicula: this.peliculaId,
        idUsuario: this.usuarioId,
        puntuacion: 1,
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
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  cerrarModal() {
    const modal = document.getElementById('reseniaModal');
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
    }

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    // Habilitar el scroll de la página
    document.body.style.overflow = 'auto';  // Restauro el estilo de overflow
    document.body.style.paddingRight = '';

    //limpio el formulario
    this.formulario.reset({
      puntuacion: 1,
      descripcion: '',
      idUsuario: this.usuarioId,
      idPelicula: this.peliculaId
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

















