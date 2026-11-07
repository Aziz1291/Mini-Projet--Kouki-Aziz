import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5">
          <div class="auth-wrapper text-center">
            <span class="kicker text-danger mb-2">Erreur 403 : accès refusé</span>
            <div class="mb-3 fs-1 text-danger"></div>
            <h3 class="mb-2">Accès Non Autorisé</h3>
            <p class="text-muted small mb-4">
              Vos privilèges actuels ne vous permettent pas d'administrer ou de modifier cette ressource. 
              Cette opération requiert le rôle <strong>ADMIN</strong>.
            </p>

            <div class="d-flex justify-content-center gap-2">
              <a routerLink="/laptops" class="btn btn-primary">
                ← Retour au Catalogue
              </a>
              <a routerLink="/login" class="btn btn-secondary">
                Changer de compte
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class Forbidden { }
