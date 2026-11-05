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

export const routes: Routes = [
  { path: 'privacy', component: Privacy },
  { path: 'laptops', component: Laptops },
  { path: 'add-laptop', component: AddLaptop, canActivate: [laptopGuard] },
  { path: 'updateLaptop/:id', component: UpdateLaptop, canActivate: [laptopGuard] },
  { path: 'rechercheParModel', component: RechercheParModel },
  { path: 'recherche-par-model', redirectTo: 'rechercheParModel' },
  { path: 'rechercheParNom', component: RechercheParNom },
  { path: 'recherche-par-nom', redirectTo: 'rechercheParNom' },
  { path: 'listeModels', component: ListeModels, canActivate: [laptopGuard] },
  { path: 'liste-models', redirectTo: 'listeModels' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'verifEmail', component: VerifEmail },
  { path: 'verif-email', redirectTo: 'verifEmail' },
  { path: 'forbidden', redirectTo: 'app-forbidden' },
  { path: 'app-forbidden', component: Forbidden },
  { path: '', redirectTo: 'laptops', pathMatch: 'full' },
  { path: '**', redirectTo: 'laptops' }
];
