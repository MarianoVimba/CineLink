import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './usuario/autenticacion/login/login.component';
import { RegistroComponent } from './usuario/autenticacion/registro/registro.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { UpdateComponent } from './usuario/update/update.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PerfilUsuarioPageComponent } from './pages/perfil-usuario-page/perfil-usuario-page.component';
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
      component: BuscarComponent
    },
    {
      path: 'buscar/:texto',
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
