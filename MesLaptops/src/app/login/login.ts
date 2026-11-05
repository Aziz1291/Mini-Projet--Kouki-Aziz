import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
    this.loading = true;
    this.authService.login(this.user).subscribe({
      next: (data) => {
        this.loading = false;
        const jwToken = data.headers.get('Authorization') || data.headers.get('authorization') || (data.body as any)?.token || (data.body as any)?.jwt;
        if (jwToken) {
          this.authService.saveToken(jwToken);
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.erreur = 1;
        if (err.error && err.error.errorCause === 'disabled') {
          this.message = 'Compte désactivé. Veuillez contacter votre administrateur.';
        } else {
          this.message = 'Identifiant ou mot de passe incorrect.';
        }
      }
    });
  }
}
