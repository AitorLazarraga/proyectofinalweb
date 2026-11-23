import { computed, Service, signal } from '@angular/core';
import { Car } from '../models/car';

@Service()
export class Cart {

    CART_KEY = 'carrito'
    items = signal<Car[]>(this.leer());
    total = computed(() => this.items().length);

    private leer(): Car[] {
        try{
            return JSON.parse(localStorage.getItem(this.CART_KEY) ?? '[]');
        }
        catch{
            return [];
        }
    }

    agregar(coche: Car){
        for(let i = 0; i < this.items().length; i++){
            if(coche._id === this.items()[i]._id){
                return;
            }
        }
        this.items.update(lista => [...lista, coche])
        this.guardar();
        return;
    }

    quitar(coche: Car){
        this.items.update(lista => lista.filter(car => car._id !== coche._id));
        this.guardar();
        return;
    }

    vaciar(){
        this.items.set([]);
        this.guardar();
    }

    enCarrito(id: string){
        for(let i = 0; i < this.items().length; i++){
            if(this.items()[i]._id === id){
                return true;
            }
        }
        return false;
    }

    private guardar(){
        let guardar = JSON.stringify(this.items());
        localStorage.setItem(this.CART_KEY, guardar);
        return;
    }
}
