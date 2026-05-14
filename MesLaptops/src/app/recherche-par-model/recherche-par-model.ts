import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Laptop, Model } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';

@Component({
  selector: 'app-recherche-par-model',
  imports: [FormsModule, DatePipe],
  templateUrl: './recherche-par-model.html',
  styles: ``
})
export class RechercheParModel implements OnInit {

  laptops! : Laptop[];
  IdModel! : number;
  models! : Model[];

  constructor(private laptopService: LaptopService) { }

  ngOnInit(): void {
    this.laptopService.listeModels().subscribe(data => {
      this.models = data._embedded.models;
      console.log(data);
    });
  }

  onChange() {
    this.laptopService.rechercherParModel(this.IdModel)
      .subscribe(laptops => { this.laptops = laptops; });
  }
}
