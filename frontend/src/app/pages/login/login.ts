import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/user';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  mensaje_error = signal('');
  mensaje_guay = signal('');
  authService = inject(Auth);
  router = inject(Router);
  form = new FormGroup({
    mail: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  login(){
    this.mensaje_error.set('');
    this.mensaje_guay.set('');
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.getRawValue();
    const datos: LoginRequest = {
      email: data.mail,
      password: data.password,
    }
    this.authService.login(datos).subscribe({
      next: (respuesta) => {
        this.mensaje_guay.set('Login Correcto, redirigiendo a lista de coches...');
        console.log(`Respuesta del servidor ${respuesta}`);
        setTimeout(() => {this.router.navigate(['/coches'])}, 1500);
      },
      error: (err) => {
        this.mensaje_error.set(`Login fallido con error: ${err.error?.message}`);
      }
    })
  }

}


