import { Usuario } from '../../../interfaces/usuario.interface';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formUsuario: FormGroup;
  servcio = inject(UsuarioService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmacionPassword: ['', [Validators.required, Validators.minLength(8)]],
      pais: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      descripcion: ['']
    });
  }

  addUsuario() {

    if (this.formUsuario.invalid) return;
    const nuevoUsuario = {...this.formUsuario.getRawValue(),
    listaFavoritos: []
  };
    this.altaBD(nuevoUsuario);
  }

    altaBD(nuevoUsuario: Usuario){
      this.servcio.addUsuario(nuevoUsuario).subscribe({
        next: () =>
        {
          alert('usuario creado');
          this.router.navigate(['inicio']);
        },
        error: (err: Error) =>
        {
          console.log(err.message);
        }
      })
    }
  }

