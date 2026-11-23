import { inject, Service, signal } from '@angular/core';
import { Car, CarRequest } from '../models/car';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Service()
export class Cars {
  private http = inject(HttpClient);

  get_cars(){
    const get_url = `${environment.apiUrl}cars`
    return this.http.get<Car[]>(get_url);
      }

  delete_car(id: string){
    const delete_url = `${environment.apiUrl}cars/${id}`
    return this.http.delete(delete_url);
  }

  create_car(datos: CarRequest){
    const post_url = `${environment.apiUrl}cars`
    return this.http.post<CarRequest>(post_url, datos);
  }

  get_car(id: string){
    const get_urlc = `${environment.apiUrl}cars/${id}`;
    return this.http.get<Car>(get_urlc);
  }

  update_car(id: string, datos:CarRequest){
    const get_urlc = `${environment.apiUrl}cars/${id}`;
    return this.http.put<Car>(get_urlc, datos);
  }

  buy_car(id: string){
    const buy_urlc = `${environment.apiUrl}cars/buy/${id}`;
    return this.http.post(buy_urlc, {});
  }
}
