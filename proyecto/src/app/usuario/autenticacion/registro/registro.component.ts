import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {
  formUsuario: FormGroup;
  servicio = inject(UsuarioService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)], this.nombreUsuarioDisponible.bind(this)],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmacionPassword: ['', [Validators.required, Validators.minLength(8)]],
      pais: ['', [Validators.required, Validators.minLength(4)]],
      ciudad: ['', [Validators.required, Validators.minLength(2)]],
      palabraClave: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['']
    }, { validators: this.passwordsMatch.bind(this) });
  }

  // Verificación de disponibilidad del nombre de usuario (Validación Asíncrona)
  nombreUsuarioDisponible(control: AbstractControl): Observable<{ [key: string]: boolean } | null> {
    const nombreUsuario = control.value;
    return this.servicio.verificarNombreUsuarioExistente(nombreUsuario).pipe(
      map(existe => (existe ? { nombreUsuarioExistente: true } : null))
    );
  }

  // Verifica que las contraseñas sean iguales
  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmacionPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { contraseñaNoCoinciden: true };
    }

    return null;
  }

  addUsuario() {
    if (this.formUsuario.invalid) return;

    const nuevoUsuario = {
      ...this.formUsuario.getRawValue(),
      listaFavoritos: [],
      seguidores: [],
      seguidos: []
    };

    this.altaBD(nuevoUsuario);
  }

  altaBD(nuevoUsuario: any) {
    this.servicio.addUsuario(nuevoUsuario).subscribe({
      next: () => {
        alert('Usuario creado');
        this.router.navigate(['login']);
      },
      error: (err: Error) => {
        console.log(err.message);
      }
    });
  }

}
