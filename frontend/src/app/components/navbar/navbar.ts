import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { Auth } from '../../services/auth';
import { Cart } from '../../services/cart';


@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

  carrito = inject(Cart);
  authService = inject(Auth);
  username = this.authService.get_username();
  router = inject(Router);

  cerrar_sesion() {
    console.log("Sesión Cerrada");
    this.carrito.vaciar();
    this.authService.logout();
    this.router.navigate(['/login'])

  }
}
