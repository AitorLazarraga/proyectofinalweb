import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Car } from '../../models/car';
import { Cars } from '../../services/cars'
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';
import { filter } from 'rxjs';

@Component({
  imports: [Navbar, CurrencyPipe, DecimalPipe, RouterLink, RouterLinkActive],
  selector: 'app-mis-coches',
  styleUrl: './mis-coches.css',
  templateUrl: './mis-coches.html',
})
export class MisCoches implements OnInit {

  textoBusqueda = signal("");
  categoriaFiltro = signal("");
  orden = signal<"" | "asc" | "desc">("");
  carService = inject(Cars)
  coches = signal<Car[]>([]);
  cargando = signal(true);
  mensaje_error = signal('');
  mensaje_fallo = signal('');
  mensaje_guay = signal('');
  authUser = inject(Auth);
  id = this.authUser.get_user_id();

  ngOnInit(): void {
    this.carService.get_cars().subscribe({
      next: (datos) => {
        this.coches.set(datos);
        this.cargando.set(false);
      },
      error: (err) => {
        this.mensaje_fallo.set('No se han podido cargar tus coches');
        this.cargando.set(false);
      }
    });
  }

  eliminar(coche: Car){
    this.mensaje_error.set('');
    this.mensaje_guay.set('');

    this.carService.delete_car(coche._id!).subscribe({
      next: () => { 
        this.coches.update(coches => coches.filter(cochee => cochee._id !== coche._id))
        this.mensaje_guay.set('Coche eliminado correctamente');
      },
      error: (err) => {
        this.mensaje_error.set('No se ha podido borrar el coche');
      }
    })
  }

  cambiarOrden(valor: string) {
  this.orden.set(valor as '' | 'asc' | 'desc');
}

  cochesFiltrados = computed(() => {
    const texto = this.textoBusqueda().toLowerCase().trim();
    const filtro = this.categoriaFiltro().toLowerCase();
    const orden = this.orden();

    let copia = this.coches().filter(coche => coche.idUser === this.id);

    if(texto !== ""){
      copia = copia.filter(coche => coche.name.toLowerCase().includes(texto)); 
    }

    if(filtro !== ""){
      copia = copia.filter(coche => coche.category.toLowerCase().includes(filtro));
    }

    if(orden !== ""){
      if(orden === "asc"){
        copia.sort((a,b) => a.price - b.price);
      }
      else{
        copia.sort((a,b) => b.price - a.price);
      }
    }
    return copia;
  })

  imagenPorDefecto(event: Event) {
  const img = event.target as HTMLImageElement;
  if (!img.src.endsWith('/sin_imagen.jpeg')) {
    img.src = '/sin_imagen.jpeg';
  }
}

}

