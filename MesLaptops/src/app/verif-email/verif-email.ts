import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verif-email',
  imports: [FormsModule],
  templateUrl: './verif-email.html',
})
export class VerifEmail implements OnInit {

  code: string = '';
  user: User = new User();
  err: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.user = this.authService.registredUser;
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('Email validé ! Connexion en cours...');
        // Auto-login after validation
        this.authService.login(this.user).subscribe({
          next: (data) => {
            const jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log('Auto-login failed:', err);
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err: any) => {
        if (err.error?.errorCode === 'INVALID_TOKEN')
          this.err = 'Code invalide !';
        else if (err.error?.errorCode === 'EXPIRED_TOKEN')
          this.err = 'Code expiré ! Veuillez vous réinscrire.';
        else
          this.err = err.error?.message || 'Une erreur est survenue.';
      }
    });
  }
}
