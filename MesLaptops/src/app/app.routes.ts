import { Privacy } from './privacy';
import { Routes } from '@angular/router';
import { Laptops } from './laptops/laptops';
import { AddLaptop } from './add-laptop/add-laptop';
import { UpdateLaptop } from './update-laptop/update-laptop';
import { RechercheParModel } from './recherche-par-model/recherche-par-model';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { ListeModels } from './liste-models/liste-models';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { Register } from './register/register';
import { VerifEmail } from './verif-email/verif-email';
import { laptopGuard } from './guards/laptop.guard';
import { Component } from '@angular/core';
import { authGuard, consentGuard, consentPageGuard } from './guards/access.guards';

/** Empty page: the consent screen itself is drawn by the root component. */
@Component({ standalone: true, template: '' })
export class Consent {}

export const routes: Routes = [
  { path: 'privacy', component: Privacy },
  { path: 'consent', component: Consent, canActivate: [consentPageGuard] },
  { path: 'laptops', component: Laptops, canActivate: [consentGuard, authGuard] },
  { path: 'add-laptop', component: AddLaptop, canActivate: [consentGuard, laptopGuard] },
  { path: 'updateLaptop/:id', component: UpdateLaptop, canActivate: [consentGuard, laptopGuard] },
  { path: 'rechercheParModel', component: RechercheParModel, canActivate: [consentGuard, authGuard] },
  { path: 'recherche-par-model', redirectTo: 'rechercheParModel' },
  { path: 'rechercheParNom', component: RechercheParNom, canActivate: [consentGuard, authGuard] },
  { path: 'recherche-par-nom', redirectTo: 'rechercheParNom' },
  { path: 'listeModels', component: ListeModels, canActivate: [consentGuard, laptopGuard] },
  { path: 'liste-models', redirectTo: 'listeModels' },
  { path: 'login', component: Login, canActivate: [consentGuard] },
  { path: 'register', component: Register, canActivate: [consentGuard] },
  { path: 'verifEmail', component: VerifEmail, canActivate: [consentGuard] },
  { path: 'verif-email', redirectTo: 'verifEmail' },
  { path: 'forbidden', redirectTo: 'app-forbidden' },
  { path: 'app-forbidden', component: Forbidden, canActivate: [consentGuard] },
  { path: '', redirectTo: 'laptops', pathMatch: 'full' },
  { path: '**', redirectTo: 'laptops' }
];
