import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../models/user';
import { tap } from 'rxjs';


@Service()
export class Auth {
    private http = inject(HttpClient);

    register(datos: RegisterRequest){
        const post_url = `${environment.apiUrl}users/register`;
        return this.http.post<User>(post_url, datos);
    }

    login(datos: LoginRequest){
    const login_url = `${environment.apiUrl}auth/login`;
    return this.http.post<LoginResponse>(login_url, datos).pipe(tap(respuesta => this.guardar_sesion(respuesta)));
    }

    guardar_sesion(response: LoginResponse){
        localStorage.setItem('user', response.user);
        localStorage.setItem('token', response.access_token);
    }

    get_token(){
        const token = localStorage.getItem('token');
        if(token == null){
            return null
        }
        const sub = this.get_user_id(token);
        return [token,sub]
    }

    get_username(){
        return localStorage.getItem('user');
    }

    get_user_id(token: string){
        const payloadBase64 = token.split('.')[1];
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));

        return payload.sub
    }

    is_logged(){
        return (localStorage.getItem('token') != null);
    }

    logout(){
        localStorage.clear();
    }
}

