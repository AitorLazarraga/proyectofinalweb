import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  textoBusqueda = signal("");
  categoriaFiltro = signal("");
  orden = signal<"" | "asc" | "desc">("");
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

  cambiarOrden(valor: string) {
  this.orden.set(valor as '' | 'asc' | 'desc');
}

  cochesFiltrados = computed(() => {
    const texto = this.textoBusqueda().toLowerCase().trim();
    const filtro = this.categoriaFiltro().toLowerCase();
    const orden = this.orden();

    let copia = [...this.coches()];

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
