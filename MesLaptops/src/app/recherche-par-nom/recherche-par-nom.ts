import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Laptop } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [FormsModule, DatePipe, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {

  nomLaptop! : string;
  laptops!: Laptop[];
  allLaptops!: Laptop[];
  searchTerm: string = '';

  constructor(private laptopService: LaptopService) { }

  ngOnInit(): void {
    this.laptopService.listeLaptops().subscribe(laptops => {
      console.log(laptops);
      this.laptops = laptops;
      this.allLaptops = laptops;
    });
  }

  rechercherLaptops() {
    if (this.nomLaptop)
      this.laptopService.rechercherParNom(this.nomLaptop).subscribe(laptops => {
        console.log(laptops);
        this.laptops = laptops;
      });
    else
      this.laptopService.listeLaptops().subscribe(laptops => {
        this.laptops = laptops;
      });
  }

  onKeyUp(filterText: string) {
    this.laptops = this.allLaptops.filter(item =>
      item.brandLaptop.toLowerCase().includes(filterText));
  }
}
