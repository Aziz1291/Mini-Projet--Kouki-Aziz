import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Mes Laptops';
  constructor (public authService: AuthService,
               private router: Router,
  ) {}

  ngOnInit () {
    this.authService.loadToken();
    const guestRoutes = ['/login', '/register', '/verifEmail', '/verif-email', '/forbidden', '/app-forbidden'];
    const hash = window.location.hash.replace(/^#/, '');
    const isGuestRoute = guestRoutes.some(route => hash.startsWith(route));

    if (!isGuestRoute && (this.authService.getToken() == null || this.authService.isTokenExpired())) {
      this.router.navigate(['/login']);
    }
  }

  onLogout(){
    console.log("logout-------1");
    this.authService.logout();
  }
}
