import { Component, computed, inject, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Cart } from '../../services/cart';
import { Cars } from '../../services/cars';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  imports: [Navbar, RouterLink, CurrencyPipe, DecimalPipe],
  selector: 'app-carrito',
  styleUrl: './carrito.css',
  templateUrl: './carrito.html',
})
export class Carrito {

  carrito = inject(Cart);
  carService = inject(Cars);
  router = inject(Router);

  mensaje_error = signal('');
  mensaje_guay = signal('');
  enviando = signal(false);

  precioTotal = computed(() => 
    this.carrito.items().reduce((suma, coche) => suma + coche.price, 0)
  );

  comprar_coches(){
    this.mensaje_error.set('');
    this.mensaje_guay.set('');
    this.enviando.set(true);
    const peticiones = this.carrito.items().map(coche => this.carService.buy_car(coche._id!));
    forkJoin(peticiones).subscribe({
      next: () => {
        this.carrito.vaciar();
        this.mensaje_guay.set('Coches comprados');
        this.enviando.set(false);
        setTimeout(() => {this.router.navigate(['/coches'])}, 1500);
      },
      error: () => {
        this.enviando.set(false);
        this.mensaje_error.set("No se han podido comprar todos los coches, Revisa la lista a ver cual ha sido comprado y cual no");
      }
    });
  }

  vaciar_cesta(){
    if(confirm("Vas a vaciar la cesta, seguro?")){
      this.carrito.vaciar();
      this.mensaje_guay.set("Cesta Limpia");
    }
  }

  imagenPorDefecto(event: Event) {
  const img = event.target as HTMLImageElement;
  if (!img.src.endsWith('/sin_imagen.jpeg')) {
    img.src = '/sin_imagen.jpeg';
  }
}

}
