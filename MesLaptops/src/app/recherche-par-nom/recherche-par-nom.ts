import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Laptop } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {
  laptops!: Laptop[];
  allLaptops!: Laptop[];
  searchTerm: string = '';
  viewMode: 'grid' | 'table' = 'grid';

  apiurl: string = environment.laptopsApiURL;
  ts: number = Date.now();

  popularBrands: string[] = ['Apple', 'Dell', 'Lenovo', 'HP', 'Asus', 'Acer', 'MSI'];

  constructor(private laptopService: LaptopService) { }

  ngOnInit(): void {
    this.ts = Date.now();
    this.laptopService.listeLaptops().subscribe(laptops => {
      this.laptops = laptops;
      this.allLaptops = laptops;
    });
  }

  setFilter(brand: string) {
    if (this.searchTerm.toLowerCase() === brand.toLowerCase()) {
      this.searchTerm = '';
    } else {
      this.searchTerm = brand;
    }
  }

  clearSearch() {
    this.searchTerm = '';
  }

  setViewMode(mode: 'grid' | 'table') {
    this.viewMode = mode;
  }

  parseSpecs(caracteristiques?: string): string[] {
    if (!caracteristiques) return [];
    return caracteristiques.split(/[,;|]/).map(s => s.trim()).filter(s => s.length > 0);
  }
}
