import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { RegisterRequest } from '../../models/user';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';


export const passwordsIguales: ValidatorFn = (grupo: AbstractControl): ValidationErrors | null => {
  const password = grupo.get('password')?.value;
  const confirmacion = grupo.get('rep_password')?.value;
  return password === confirmacion ? null : { passwordsNoCoinciden: true };
};

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  mensaje_error = signal('');
  mensaje_guay = signal('');
  authService = inject(Auth);
  router = inject(Router);
  form = new FormGroup({
    user: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    mail: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    rep_password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    latitude: new FormControl<number | null>(null, Validators.required),
    longitude: new FormControl<number | null>(null, Validators.required) 
  }, {validators: passwordsIguales});
  registrar(){
    this.mensaje_error.set('');
    this.mensaje_guay.set('');
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    else{
        const data = this.form.getRawValue();
        const datos: RegisterRequest = {
          username: data.user,
          email: data.mail,
          password: data.password,
          latitude: data.latitude!,
          longitude: data.longitude!,
        }
        this.authService.register(datos).subscribe({
        next: (respuesta) => {
          this.mensaje_guay.set('Registro de usuarios correcto, redirigiendo a login...');
          console.log(`Respuesta del servidor ${respuesta}`);
          setTimeout(() => {this.router.navigate(['/login'])}, 1500)
         },
        error: (err) => {
          this.mensaje_error.set(`Fallo en registro usuarios error: ${err.error?.message}`);
        }
    });
    }
  }
}
