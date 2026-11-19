import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Car, CarRequest } from '../../models/car';
import { Cars } from '../../services/cars';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  imports: [ReactiveFormsModule, Navbar, RouterLink, RouterLinkActive],
  selector: 'app-agregar',
  styleUrl: './agregar.css',
  templateUrl: './agregar.html',
})
export class Agregar {

  carService = inject(Cars)
  mensaje_error = signal('');
  mensaje_guay = signal('');
  authService = inject(Auth);
  router = inject(Router);

  enviando = signal(false);

  imagenPreview = signal('');
  
  form = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      km: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      image: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });

  crear_coche(){
    this.mensaje_error.set('');
    this.mensaje_guay.set('');
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    else{
    const userId = this.authService.get_user_id();
    if (!userId) {
      this.mensaje_error.set("No Existe Usuario Para Crear Coche");
      return;
    }
    const data = this.form.getRawValue();
    const datos: CarRequest = {
      name: data.name,
      description: data.description,
      price: data.price!,
      km: data.km!,
      image: data.image,
      category: data.category as Car['category'], 
      idUser: userId,
    }
    this.enviando.set(true);

    this.carService.create_car(datos).subscribe({
      next: () => {
        this.mensaje_guay.set('Coche creado con exito, redirigiendo a Mis Coches...');
        setTimeout(() => {this.router.navigate(['/mis-coches'])}, 1500)
      },

      error: (err) => {
        this.mensaje_error.set('El coche no ha podido ser creado, redirigiendo a mis coches');
        this.enviando.set(false);
      }
    })
    }
  }

  imagenPorDefecto(event: Event) {
  const img = event.target as HTMLImageElement;
  if (!img.src.endsWith('/sin_imagen.jpeg')) {
    img.src = '/sin_imagen.jpeg';
  }
}
}
