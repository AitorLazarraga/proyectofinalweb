import { inject, Service, signal } from '@angular/core';
import { Car } from '../models/car';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Service()
export class Cars {
  private http = inject(HttpClient);

  get_cars(){
    const get_url = `${environment.apiUrl}cars`
    return this.http.get<Car[]>(get_url);
      }


}
