import { Usuario } from './../../interfaces/usuario.interface';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  id: string | null = '';
  nombreActual: string | null = null;

  router = inject(Router);
  ruta = inject(ActivatedRoute);
  servicio = inject(UsuarioService);
  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group({
    nombreUsuario: ['', [Validators.required, Validators.minLength(3)], [this.nombreUsuarioDisponible.bind(this)]],
    pais: ['', [Validators.required, Validators.minLength(4)]],
    ciudad: ['', [Validators.required, Validators.minLength(2)]],
    descripcion: ['']
  });

  ngOnInit(): void {
    this.ruta.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getUsuario(this.id);
      }
    });
  }

  nombreUsuarioDisponible(control: any) {
    const nombreUsuario = control.value;
  
    // Si el valor no ha cambiado (es el mismo que el traído del backend), no validar
    if (nombreUsuario === this.nombreActual) {
      return of(null); // Retorna un Observable con null, indicando que no hay error
    }
  
    // Si se cambió el valor, verificar con el servicio
    return this.servicio.verificarNombreUsuarioExistente(nombreUsuario).pipe(
      map(existe => existe ? { nombreUsuarioExistente: true } : null)
    );
  }

  getUsuario(id: string) {
    this.servicio.getUsuarioById(id).subscribe({
      next: (usuario: Usuario) => {
        console.log('Usuario obtenido:', usuario);  // Verifica los datos completos aquí
        this.setPersonaje(usuario);  // Cargar los datos en el formulario
      },
      error: () => {
        console.log('Error al obtener el usuario');
      }
    });
  }

  setPersonaje(usuario: Usuario) {
    // Guardar el nombre actual para comparar en el validador
    this.nombreActual = usuario.nombreUsuario;
  
    // Cargar los datos en el formulario
    this.formulario.patchValue({
      nombreUsuario: usuario.nombreUsuario || '',  // Asignar nombreUsuario
      pais: usuario.pais || '',                    // Asignar pais
      ciudad: usuario.ciudad || '',                // Asignar ciudad
      descripcion: usuario.descripcion || ''       // Asignar descripcion
    });
  
    // Marca todos los controles como "tocados" para validar inmediatamente
    Object.values(this.formulario.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }

  actualizar() {
    this.formulario.updateValueAndValidity();
    if (this.formulario.invalid) return;

    const usuarioActualizado: Partial<Usuario> = {};

    Object.keys(this.formulario.controls).forEach(key => {
      const control = this.formulario.get(key);
      if (control) {
        usuarioActualizado[key as keyof Usuario] = control.value;
      }
    });

    this.servicio.updateUsuario(this.id, usuarioActualizado).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente');
        this.volverAlinicio();
      },
      error: () => {
        console.log('Error al actualizar el usuario');
      }
    });
  }

  volverAlinicio() {
    this.router.navigate(['/inicio']);
  }
}