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
  loading = true;
  loadError = false;
  private request = 0;

  apiurl: string = environment.laptopsApiURL;
  ts: number = Date.now();

  constructor(private laptopService: LaptopService) { }

  ngOnInit(): void {
    this.ts = Date.now();
    this.loadModels();
  }

  loadModels() {
    this.loading = true;
    this.loadError = false;
    this.laptopService.listeModels().subscribe({
      next: data => {
        this.models = data._embedded.models;
        // Preselect first model if available
        if (this.models && this.models.length > 0) {
          this.selectModel(this.models[0].idModel);
        } else {
          this.loading = false;
        }
      },
      error: () => {
        this.loading = false;
        this.loadError = true;
      }
    });
  }

  selectModel(id: number) {
    this.IdModel = id;
    this.onChange();
  }

  onChange() {
    if (!this.IdModel) return;
    const request = ++this.request;
    this.loading = true;
    this.loadError = false;
    this.laptopService.rechercherParModel(this.IdModel).subscribe({
      next: laptops => {
        if (request !== this.request) return; // a newer model was chosen meanwhile
        this.laptops = laptops;
        this.loading = false;
      },
      error: () => {
        if (request !== this.request) return;
        this.laptops = [];
        this.loading = false;
        this.loadError = true;
      }
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
