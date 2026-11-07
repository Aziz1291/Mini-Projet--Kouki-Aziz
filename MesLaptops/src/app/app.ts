import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ConsentService } from './services/consent.service';
import { environment } from '../environments/environment';

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
  declined = false;
  private pendingUrl = '/';

  get privacyPage(): boolean { return this.router.url.split('?')[0] === '/privacy'; }

  constructor (public authService: AuthService,
               private router: Router,
               private consent: ConsentService) {}

  ngOnInit () {
    this.pendingUrl = window.location.hash.replace(/^#/, '') || '/';
    this.acknowledged = this.consent.accepted;
    if (this.acknowledged) this.startApp();
  }

  acknowledge(): void {
    if (!this.policyChecked) return;
    this.consent.accept();
    this.acknowledged = true;
    this.declined = false;
    this.startApp();
    const target = /^\/(privacy|consent)/.test(this.pendingUrl) ? '/login' : this.pendingUrl;
    this.router.navigateByUrl(target);
  }

  decline(): void { this.declined = true; }

  private startApp(): void {
    this.authService.loadToken();
    this.wakeServices();
  }

  /** The free hosting sleeps when idle: wake both services as soon as the visitor has accepted. */
  private wakeServices(): void {
    const urls = [environment.usersApiURL + '/login', environment.laptopsApiURL + '/all'];
    for (const u of urls) {
      try { fetch(u, { method: 'GET', mode: 'no-cors', cache: 'no-store' }).catch(() => {}); } catch {}
    }
  }

  onLogout(){
    this.authService.logout();
  }
}
