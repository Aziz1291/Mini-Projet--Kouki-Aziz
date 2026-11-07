import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Laptop, Model } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';
import { apiErrorMessage, BRAND_MAX, imageProblem, laptopProblems, PRICE_MAX, SPECS_MAX } from '../model/laptop-rules';

@Component({
  selector: 'app-add-laptop',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-laptop.html',
})
export class AddLaptop implements OnInit {
  newLaptop = new Laptop();
  models!: Model[];
  newIdModel!: number;

  uploadedImage!: File;
  imagePath: any;

  readonly brandMax = BRAND_MAX;
  readonly specsMax = SPECS_MAX;
  readonly priceMax = PRICE_MAX;
  readonly today = new Date().toISOString().slice(0, 10);
  saving = false;
  serverError = '';
  imageError = '';

  get problems(): string[] {
    return laptopProblems(this.newLaptop, !!this.newIdModel);
  }

  quickSpecs: string[] = [
    'Intel Core i7',
    'Intel Core i9',
    'Apple M3 Pro',
    'AMD Ryzen 7',
    '16 Go RAM',
    '32 Go RAM',
    '64 Go RAM',
    '512 Go SSD NVMe',
    '1 To SSD NVMe',
    'RTX 4060 8Go',
    'Écran 16" OLED'
  ];

  constructor(private laptopService: LaptopService, private router: Router) {}

  ngOnInit(): void {
    // Default today's date formatted yyyy-MM-dd
    this.newLaptop.dateCreation = new Date();
    this.laptopService.listeModels().subscribe(data => {
      this.models = data._embedded.models;
      if (this.models && this.models.length > 0) {
        this.newIdModel = this.models[0].idModel;
      }
    });
  }

  appendSpec(spec: string) {
    if (!this.newLaptop.caracteristiquesLaptop) {
      this.newLaptop.caracteristiquesLaptop = spec;
    } else {
      this.newLaptop.caracteristiquesLaptop += ', ' + spec;
    }
  }

  getSelectedModelName(): string {
    if (!this.models || !this.newIdModel) return 'Modèle';
    const found = this.models.find(m => m.idModel == this.newIdModel);
    return found ? found.nomModel : 'Modèle';
  }

  parseSpecs(caracteristiques?: string): string[] {
    if (!caracteristiques) return [];
    return caracteristiques.split(/[,;|]/).map(s => s.trim()).filter(s => s.length > 0);
  }

  addLaptop() {
    // The button stays disabled while saving, so a double click adds one laptop, not two.
    if (this.saving || this.problems.length) return;
    this.saving = true;
    this.serverError = '';
    this.newLaptop.brandLaptop = (this.newLaptop.brandLaptop ?? '').trim();
    this.newLaptop.model = this.models.find(m => m.idModel == this.newIdModel)!;
    this.laptopService.ajouterLaptop(this.newLaptop).subscribe({
      next: (laptop) => {
        if (this.uploadedImage) {
          this.laptopService.uploadImageFS(this.uploadedImage, this.uploadedImage.name, laptop.idLaptop)
            .subscribe({
              next: () => this.router.navigate(['laptops']),
              error: () => this.router.navigate(['laptops'])
            });
        } else {
          this.router.navigate(['laptops']);
        }
      },
      error: (error) => {
        this.saving = false;
        this.serverError = apiErrorMessage(error);
      }
    });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.imageError = imageProblem(file) ?? '';
      if (this.imageError) {
        event.target.value = '';
        return;
      }
      this.uploadedImage = file;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => {
        this.imagePath = reader.result;
      };
    }
  }
}
