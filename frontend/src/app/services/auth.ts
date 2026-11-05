import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegisterRequest, User } from '../models/user';

@Service()
export class Auth {
    private http = inject(HttpClient);

    register(datos: RegisterRequest){
        const post_url = `${environment.apiUrl}users/register`;
        return this.http.post<User>(post_url, datos);

    }
}

