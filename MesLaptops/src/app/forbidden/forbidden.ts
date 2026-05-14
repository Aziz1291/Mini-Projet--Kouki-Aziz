import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  imports: [],
  template: `
    <div class="container mt-5">
      <div class="alert alert-danger">
        <strong>Vous n'êtes pas autorisé à accéder à cette page…</strong>
      </div>
    </div>
  `,
  styles: ``
})
export class Forbidden { }
