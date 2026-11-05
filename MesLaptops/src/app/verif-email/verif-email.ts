import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verif-email.html',
  styles: ``
})
export class VerifEmail implements OnInit {
  code: string = '';
  user: User = new User();
  err = '';
  loading: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.registredUser;
  }

  onValidateEmail() {
    this.loading = true;
    this.err = '';
    this.authService.validateEmail(this.code.trim()).subscribe({
      next: () => {
        this.authService.login(this.user).subscribe({
          next: (data) => {
            this.loading = false;
            const jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            this.loading = false;
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 400) {
          this.err = err.error?.message || 'Code de vérification invalide ou expiré.';
        } else {
          this.err = 'Code invalide ou expiré. Veuillez vérifier votre boîte mail.';
        }
      }
    });
  }
}
