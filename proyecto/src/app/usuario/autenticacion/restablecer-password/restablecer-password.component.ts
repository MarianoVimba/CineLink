import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../interfaces/usuario.interface';

@Component({
  selector: 'app-restablecer-password',
  standalone: true,
  templateUrl: './restablecer-password.component.html',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  styleUrls: ['./restablecer-password.component.css'],
})
export class RestablecerPasswordComponent {
  formUsuario: FormGroup;
  servicio = inject(UsuarioService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.formUsuario = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      palabraClave: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmacionPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: this.verificarCoincidenciaContraseña,
    });
  }

  // Validador personalizado para verificar que las contraseñas coinciden
  verificarCoincidenciaContraseña(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmacionPassword = group.get('confirmacionPassword')?.value;

    return password === confirmacionPassword ? null : { contraseñaNoCoinciden: true };
  }

  restablecerPassword() {
    if (this.formUsuario.invalid) {
      return; // Si el formulario es inválido, no hace nada
    }
  
    const { nombreUsuario, palabraClave, password } = this.formUsuario.value;
  
    this.servicio.verificarUsuarioPorPalabraClave(nombreUsuario, palabraClave).subscribe({
      next: (usuario: Usuario | null) => {
        if (!usuario || !usuario.id) {
          alert('Nombre de usuario o palabra clave incorrectos');
          return;
        }
        // Usamos el id del usuario que coincidió, no un valor frágil de localStorage.
        this.servicio.actualizarContraseña(usuario.id, password).subscribe({
          next: () => {
            alert('Contraseña actualizada correctamente');
            this.router.navigate(['/login']);
          },
          error: () => alert('Error al actualizar la contraseña')
        });
      },
      error: () => alert('Hubo un error al verificar la palabra clave')
    });
  }
}
