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
  acknowledged = false;
  policyChecked = false;
  cookieNotice = true;
  dismissCookieNotice(): void {
    this.cookieNotice = false;
    try { sessionStorage.setItem('laptopstore_storage_notice', '1'); } catch {}
  }
  get privacyPage(): boolean { return this.router.url.split('?')[0] === '/privacy'; }
  acknowledge(): void {
    if (!this.policyChecked) return;
    this.acknowledged = true;
    try { sessionStorage.setItem('laptopstore_notice', '1'); } catch {}
    this.startApp();
  }
  constructor (public authService: AuthService,
               private router: Router,
  ) {}

  ngOnInit () {
    try { this.acknowledged = sessionStorage.getItem('laptopstore_notice') === '1'; } catch {}
    try { this.cookieNotice = sessionStorage.getItem('laptopstore_storage_notice') !== '1'; } catch {}
    if (this.acknowledged) this.startApp();
  }
  private startApp(): void {
    this.authService.loadToken();
    const guestRoutes = ['/login', '/register', '/verifEmail', '/verif-email', '/forbidden', '/app-forbidden', '/privacy'];
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
