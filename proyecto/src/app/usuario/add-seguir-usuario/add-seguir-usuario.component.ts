import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { SeguidoresService } from '../../service/seguidores.service';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-add-seguir-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-seguir-usuario.component.html',
  styleUrls: ['./add-seguir-usuario.component.css']
})
export class AddSeguirUsuarioComponent implements OnInit {
  @Input() usuarioId!: string;
  @Output() eventoAgregar = new EventEmitter();

  seguidoresService = inject(SeguidoresService);
  usuarioService = inject(UsuarioService);
  esSeguidor: boolean = false;
  userId: string | null  = localStorage.getItem('userId');

  ngOnInit(): void {
    this.verificarSeguidor();
  }

  verificarSeguidor(): void {
    if (this.userId) {
      this.seguidoresService.obtenerSeguidos(this.userId).subscribe({
        next: (seguidos: string[]) => {
          this.esSeguidor = seguidos.includes(this.usuarioId);
        },
        error: () => {
          console.log("Error al verificar si el usuario es seguido");
        }
      });
    }
  }

  seguir(): void {
    if (this.userId && !this.esSeguidor) {
      this.seguidoresService.agregarSeguido(this.userId, this.usuarioId).subscribe({
        next: () => {
          this.esSeguidor = true;
          this.eventoAgregar.emit();
          this.verificarSeguidor(); // Verificar el estado después de seguir
        },
        error: () => {
          console.log("Error al seguir al usuario");
        }
      });
    }
  }

  dejarDeSeguir(): void {
    if (this.userId && this.esSeguidor) {
      this.seguidoresService.eliminarSeguido(this.userId, this.usuarioId).subscribe({
        next: () => {
          this.esSeguidor = false;
          this.eventoAgregar.emit();
          this.verificarSeguidor(); // Verificar el estado después de dejar de seguir
        },
        error: () => {
          console.log("Error al dejar de seguir al usuario");
        }
      });
    }
  }
}
