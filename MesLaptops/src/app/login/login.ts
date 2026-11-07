import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login implements OnInit {
  user = new User();
  erreur: number = 0;
  message: string = 'Identifiant ou mot de passe incorrect.';
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  fillDemo(u: string, p: string) {
    this.user.username = u;
    this.user.password = p;
  }

  onLoggedin() {
    if (this.loading) return;
    this.erreur = 0;
    this.loading = true;
    this.authService.login(this.user).pipe(timeout(45000)).subscribe({
      next: (data) => {
        this.loading = false;
        const jwToken = data.headers.get('Authorization') || data.headers.get('authorization') || (data.body as any)?.token || (data.body as any)?.jwt;
        if (jwToken) {
          this.authService.saveToken(jwToken);
          this.router.navigate(['/']);
        } else {
          this.erreur = 1;
          this.message = 'La réponse du service de connexion est invalide. Veuillez réessayer.';
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.erreur = 1;
        if (err.error && err.error.errorCause === 'disabled') {
          this.message = 'Compte désactivé. Veuillez contacter votre administrateur.';
        } else if (err.status === 401 || err.status === 403) {
          this.message = 'Identifiant ou mot de passe incorrect.';
        } else {
          this.message = 'Le service de connexion ne répond pas ou est temporairement indisponible. Veuillez réessayer.';
        }
      }
    });
  }
}
