import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Image, Laptop, Model } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-update-laptop',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './update-laptop.html',
  styles: ``,
})
export class UpdateLaptop implements OnInit {
  currentLaptop = new Laptop();

  models!: Model[];
  updatedModelId!: number;
  myImage!: string;

  uploadedImage!: File;
  isImageUpdated: Boolean = false;

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private laptopService: LaptopService
  ) {}

  ngOnInit(): void {
    this.laptopService.listeModels().subscribe(data => {
      this.models = data._embedded.models;
    });

    const id = this.activatedRoute.snapshot.params['id'];
    this.laptopService.consulterLaptop(id).subscribe(laptop => {
      this.currentLaptop = laptop;
      if (laptop.model) {
        this.updatedModelId = laptop.model.idModel;
      }
      this.myImage = `${environment.laptopsApiURL}/image/loadfromFS/${laptop.idLaptop}?t=${Date.now()}`;
    });
  }

  appendSpec(spec: string) {
    if (!this.currentLaptop.caracteristiquesLaptop) {
      this.currentLaptop.caracteristiquesLaptop = spec;
    } else {
      this.currentLaptop.caracteristiquesLaptop += ', ' + spec;
    }
  }

  parseSpecs(caracteristiques?: string): string[] {
    if (!caracteristiques) return [];
    return caracteristiques.split(/[,;|]/).map(s => s.trim()).filter(s => s.length > 0);
  }

  updateLaptop() {
    this.currentLaptop.model = this.models.find(m => m.idModel == this.updatedModelId)!;
    if (this.isImageUpdated && this.uploadedImage) {
      this.laptopService.uploadImageFS(
        this.uploadedImage,
        this.uploadedImage.name,
        this.currentLaptop.idLaptop
      ).subscribe({
        next: () => {
          this.laptopService.updateLaptop(this.currentLaptop).subscribe(() => {
            this.router.navigate(['laptops']);
          });
        },
        error: () => {
          this.laptopService.updateLaptop(this.currentLaptop).subscribe(() => {
            this.router.navigate(['laptops']);
          });
        }
      });
    } else {
      this.laptopService.updateLaptop(this.currentLaptop).subscribe(() => {
        this.router.navigate(['laptops']);
      });
    }
  }

  onAddImageLaptop() {
    if (!this.uploadedImage) return;
    this.laptopService.uploadImageLaptop(
      this.uploadedImage,
      this.uploadedImage.name,
      this.currentLaptop.idLaptop
    ).subscribe((img: Image) => {
      if (!this.currentLaptop.images) {
        this.currentLaptop.images = [];
      }
      this.currentLaptop.images.push(img);
    });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  supprimerImage(img: Image) {
    const conf = confirm('Supprimer définitivement cette image de la galerie ?');
    if (conf) {
      this.laptopService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentLaptop.images.indexOf(img, 0);
        if (index > -1) {
          this.currentLaptop.images.splice(index, 1);
        }
      });
    }
  }
}
