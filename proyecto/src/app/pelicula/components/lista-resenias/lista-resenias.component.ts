import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReseniaService } from '../../../service/resenia.service';
import { reseña } from '../../../interfaces/reseña.interface';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../interfaces/usuario.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-resenias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-resenias.component.html',
  styleUrl: './lista-resenias.component.css'
})
export class ListaReseniasComponent implements OnInit{


  @Input() peliculaId!: number;

  servicioResenia = inject(ReseniaService);
  servicioUsuario = inject(UsuarioService);

  listaResenias: reseña[] = [];
  usuarios: Map<string, string> = new Map(); // almaceno el nombre de usuario por ID


ngOnInit(): void {


    this.cargarListaResenias();

}


cargarListaResenias(){

  this.servicioResenia.getReseniasByPelicula(this.peliculaId).subscribe({
    next:(res) =>{
      this.listaResenias = res;
      this.cargarUsuarios(res);
    },error:(e:Error) => {
      console.log(e.message);
    }
  })
}


cargarUsuarios(resenias: reseña[]) {
  resenias.forEach(resenia => {
    // Asegurarnos de que idUsuario es un string y no null ni undefined
    const idUsuario = resenia.idUsuario;
    if (idUsuario && typeof idUsuario === 'string') {
      // Llama al servicio para obtener el usuario por su id
      this.servicioUsuario.getUsuarioById(idUsuario).subscribe({
        next: (usuario: Usuario) => {
          this.usuarios.set(idUsuario, usuario.nombreUsuario);  // Almacena el nombre de usuario
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      });
    }
  });
}


obtenerNombreUsuario(idUsuario: string | null | undefined): string {
  if (!idUsuario) {
    return '';  // Devuelve una cadena vacía si idUsuario es null o undefined
  }
  return this.usuarios.get(idUsuario) || '';  // Devuelve el nombre de usuario o una cadena vacía si no lo encuentra
}

getEstrellas(puntuacion: number) {
  const contador = Math.floor(puntuacion);
  return Array(contador).fill(0);
}



}
