import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Image, Laptop, Model } from '../model/laptop.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LaptopService } from '../services/laptop.service';

@Component({
  selector: 'app-update-laptop',
  standalone: true,
  imports: [FormsModule, DatePipe],
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

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private laptopService: LaptopService) {}

  ngOnInit(): void {
    this.laptopService.listeModels().subscribe(data => {
      this.models = data._embedded.models;
    });
    this.laptopService.consulterLaptop(this.activatedRoute.snapshot.params['id'])
      .subscribe(laptop => {
        this.currentLaptop = laptop;
        this.updatedModelId = laptop.model.idModel;
        // Load current image preview from filesystem
        this.myImage = `http://localhost:8080/laptops/api/image/loadfromFS/${laptop.idLaptop}`;
      });
  }

  updateLaptop() {
    this.currentLaptop.model = this.models.find(m => m.idModel == this.updatedModelId)!;
    // If a new image was selected, upload it to the filesystem first
    if (this.isImageUpdated) {
      this.laptopService.uploadImageFS(this.uploadedImage, this.uploadedImage.name,
        this.currentLaptop.idLaptop).subscribe(() => {
          this.laptopService.updateLaptop(this.currentLaptop).subscribe(() => {
            this.router.navigate(['laptops']);
          });
        });
    } else {
      this.laptopService.updateLaptop(this.currentLaptop).subscribe(() => {
        this.router.navigate(['laptops']);
      });
    }
  }

  /* updateLaptop() {
    this.currentLaptop.model = this.models.find(m => m.idModel == this.updatedModelId)!;
    this.laptopService.updateLaptop(this.currentLaptop).subscribe((laptop) => {
      this.router.navigate(['laptops']);
    });
  } */

  onAddImageLaptop() {
    this.laptopService.uploadImageLaptop(this.uploadedImage, this.uploadedImage.name,
      this.currentLaptop.idLaptop).subscribe((img: Image) => {
        if (!this.currentLaptop.images) this.currentLaptop.images = [];
        this.currentLaptop.images.push(img);
      });
  }

  /* updateLaptop() {
    this.currentLaptop.model = this.models.find(m => m.idModel == this.updatedModelId)!;
    this.laptopService.updateLaptop(this.currentLaptop).subscribe((laptop) => {
      this.router.navigate(['laptops']);
    });
  } */

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
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.laptopService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentLaptop.images.indexOf(img, 0);
        if (index > -1) {
          this.currentLaptop.images.splice(index, 1);
        }
      });
  }
}
