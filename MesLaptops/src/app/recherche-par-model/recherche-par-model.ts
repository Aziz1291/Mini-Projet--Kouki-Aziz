import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Laptop, Model } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-recherche-par-model',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-model.html',
  styles: ``
})
export class RechercheParModel implements OnInit {
  laptops: Laptop[] = [];
  IdModel!: number;
  models!: Model[];
  viewMode: 'grid' | 'table' = 'grid';

  apiurl: string = environment.laptopsApiURL;
  ts: number = Date.now();

  constructor(private laptopService: LaptopService) { }

  ngOnInit(): void {
    this.ts = Date.now();
    this.laptopService.listeModels().subscribe(data => {
      this.models = data._embedded.models;
      // Preselect first model if available
      if (this.models && this.models.length > 0) {
        this.selectModel(this.models[0].idModel);
      }
    });
  }

  selectModel(id: number) {
    this.IdModel = id;
    this.onChange();
  }

  onChange() {
    if (!this.IdModel) return;
    this.laptopService.rechercherParModel(this.IdModel).subscribe(laptops => {
      this.laptops = laptops;
    });
  }

  setViewMode(mode: 'grid' | 'table') {
    this.viewMode = mode;
  }

  parseSpecs(caracteristiques?: string): string[] {
    if (!caracteristiques) return [];
    return caracteristiques.split(/[,;|]/).map(s => s.trim()).filter(s => s.length > 0);
  }
}
