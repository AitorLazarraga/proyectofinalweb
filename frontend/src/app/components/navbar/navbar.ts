import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { Auth } from '../../services/auth';


@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

  authService = inject(Auth);
  username = this.authService.get_username();
  router = inject(Router);

  cerrar_sesion() {
    console.log("Sesión Cerrada");
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
