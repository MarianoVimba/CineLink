import { Routes } from '@angular/router';
import { LoginComponent } from './usuario/autenticacion/login/login.component';
import { RegistroComponent } from './usuario/autenticacion/registro/registro.component';
import { UpdateComponent } from './usuario/update/update.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { BuscarPeliculaComponent } from './pelicula/components/buscar-pelicula/buscar-pelicula.component';
import { PaginaPeliculaComponent } from './pages/pagina-pelicula/pagina-pelicula.component';
import { PerfilUsuarioPageComponent } from './pages/perfil-usuario-page/perfil-usuario-page.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    {
        path:"",
        component:LoginComponent
    },
    {
        path:"registro",
        component:RegistroComponent
    },
    {
        path:"inicio",
        component: InicioComponent
    },
    {
      path:"perfil/:id",
      component:PerfilUsuarioPageComponent
    },
    {
      path: 'pelicula/:id',
      component: PaginaPeliculaComponent
    },
    {
      path: 'buscar/:texto',
      component: BuscarPeliculaComponent
    },
    {
      path: 'buscar',
      component: BuscarComponent
    },
    {
        path: 'update/:id',
        component: UpdateComponent
    },
    {
        path:'**',
        redirectTo:''
    }
];