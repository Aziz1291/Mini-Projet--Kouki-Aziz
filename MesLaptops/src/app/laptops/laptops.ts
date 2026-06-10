import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Laptop } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/laptop.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-laptops',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './laptops.html',
})
export class Laptops implements OnInit {
  laptops?: Laptop[];

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
    this.laptopService.listeLaptops().subscribe(laptops => {
      this.laptops = laptops;
    });
  }

  supprimerLaptop(p: Laptop) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.laptopService.supprimerLaptop(p.idLaptop).subscribe(() => {
        console.log('laptop supprimé');
        this.chargerLaptops();
      });
  }
}
