import { Routes } from '@angular/router';
import { Login } from './pages/login/login'
import { Agregar } from './pages/agregar/agregar'
import { Carrito } from './pages/carrito/carrito'
import { Coches } from './pages/coches/coches'
import { Editar } from './pages/editar/editar'
import { Estadisticas } from './pages/estadisticas/estadisticas'
import { MisCoches } from './pages/mis-coches/mis-coches'
import { Register } from './pages/register/register'
import { guestGuard } from './guards/guests-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: 'login', component: Login, canActivate: [guestGuard]},
    {path: 'agregar', component: Agregar, canActivate: [authGuard]},
    {path: 'carrito', component: Carrito, canActivate: [authGuard]},
    {path: 'coches', component: Coches, canActivate:[authGuard]},
    {path: 'editar', component: Editar, canActivate:[authGuard]},
    {path: 'estadisticas', component: Estadisticas, canActivate:[authGuard]},
    {path: 'mis-coches', component: MisCoches, canActivate:[authGuard]},
    {path: 'register', component: Register, canActivate:[guestGuard]},
    {path: '', component: Coches},
    {path: '**', component: Coches}
];
