import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Car } from '../../models/car';
import { Cars } from '../../services/cars'
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  imports: [Navbar, CurrencyPipe, DecimalPipe],
  selector: 'app-coches',
  styleUrl: './coches.css',
  templateUrl: './coches.html',
})
export class Coches implements OnInit{
  carService = inject(Cars)
  coches = signal<Car[]>([]);
  cargando = signal(true);
  mensaje_error = signal('');

  ngOnInit(): void {
    this.carService.get_cars().subscribe({
      next: (datos) => {
        this.coches.set(datos);
        this.cargando.set(false);
      },
      error: (err) => {
        this.mensaje_error.set('No se han podido cargar los coches');
        this.cargando.set(false);
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
