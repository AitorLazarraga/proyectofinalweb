import { Routes } from '@angular/router';
import { Login } from './pages/login/login'
import { Agregar } from './pages/agregar/agregar'
import { Carrito } from './pages/carrito/carrito'
import { Coches } from './pages/coches/coches'
import { Editar } from './pages/editar/editar'
import { Estadisticas } from './pages/estadisticas/estadisticas'
import { MisCoches } from './pages/mis-coches/mis-coches'
import { Register } from './pages/register/register'

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: 'agregar', component: Agregar},
    {path: 'carrito', component: Carrito},
    {path: 'coches', component: Coches},
    {path: 'editar', component: Editar},
    {path: 'estadisticas', component: Estadisticas},
    {path: 'mis-coches', component: MisCoches},
    {path: 'register', component: Register},
    {path: '', component: Login},
    {path: '**', component: Login}
];
