import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Cars } from '../../services/cars';
import { Car, CarRequest } from '../../models/car';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  imports: [ReactiveFormsModule, Navbar, RouterLink],
  selector: 'app-editar',
  styleUrl: './editar.css',
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  private carService = inject(Cars);
  private authService = inject(Auth);
  private router = inject(Router);
  private ruta = inject(ActivatedRoute);

  id = '';

  cargando = signal(true);
  errorCarga = signal('');
  enviando = signal(false);

  mensaje_error = signal('');
  mensaje_guay = signal('');

  imagenPreview = signal('');

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    km: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    image: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit(): void {
    const id = this.ruta.snapshot.paramMap.get('id');
    if (!id) {
      this.errorCarga.set('No se ha indicado ningún coche para editar.');
      this.cargando.set(false);
      return;
    }
    this.id = id;

    this.carService.get_car(id).subscribe({
      next: (coche) => {
        if (coche.idUser !== this.authService.get_user_id()) {
          this.errorCarga.set('No puedes editar un coche que no es tuyo.');
          this.cargando.set(false);
          return;
        }

        this.form.setValue({
          name: coche.name,
          description: coche.description,
          price: coche.price,
          km: coche.km,
          image: coche.image,
          category: coche.category,
        });
        
        this.imagenPreview.set(coche.image);
        this.cargando.set(false);
      },
      error: () => {
        this.errorCarga.set('No se ha encontrado el coche.');
        this.cargando.set(false);
      }
    });
  }

  editar_coche() {
    this.mensaje_error.set('');
    this.mensaje_guay.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const userId = this.authService.get_user_id();
    if (!userId) {
      this.mensaje_error.set('Tu sesión ha caducado. Vuelve a iniciar sesión.');
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
    };

    this.enviando.set(true);

    this.carService.update_car(this.id, datos).subscribe({
      next: () => {
        this.mensaje_guay.set('Coche modificado con éxito, redirigiendo a Mis coches...');
        setTimeout(() => this.router.navigate(['/mis-coches']), 1500);
      },
      error: () => {
        this.mensaje_error.set('No se han podido guardar los cambios. Inténtalo de nuevo.');
        this.enviando.set(false);
      }
    });
  }

  imagenPorDefecto(event: Event) {
    const img = event.target as HTMLImageElement;
    if (!img.src.endsWith('/sin_imagen.jpeg')) {
      img.src = '/sin_imagen.jpeg';
    }
  }
}