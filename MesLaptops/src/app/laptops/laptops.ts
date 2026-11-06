import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Laptop } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-laptops',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './laptops.html',
  styleUrl: './laptops.css'
})
export class Laptops implements OnInit {
  laptops?: Laptop[];
  loadError = false;
  viewMode: 'grid' | 'table' = 'grid';

  apiurl: string = environment.laptopsApiURL;
  ts: number = Date.now();

  constructor(
    private laptopService: LaptopService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chargerLaptops();
  }

  chargerLaptops() {
    this.ts = Date.now();
    this.loadError = false;
    this.laptops = undefined;
    this.laptopService.listeLaptops().pipe(timeout(45000)).subscribe({
      next: laptops => { this.laptops = laptops; },
      error: () => { this.loadError = true; }
    });
  }

  setViewMode(mode: 'grid' | 'table') {
    this.viewMode = mode;
  }

  parseSpecs(caracteristiques?: string): string[] {
    if (!caracteristiques) return [];
    return caracteristiques
      .split(/[,;|]/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  supprimerLaptop(p: Laptop) {
    const conf = confirm(`Confirmer la suppression du laptop #${p.idLaptop} (${p.brandLaptop}) ?`);
    if (conf) {
      this.laptopService.supprimerLaptop(p.idLaptop).subscribe(() => {
        this.chargerLaptops();
      });
    }
  }
}
