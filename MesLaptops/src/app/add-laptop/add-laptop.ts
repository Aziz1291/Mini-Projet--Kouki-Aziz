import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Laptop, Model } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-laptop',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-laptop.html',
})
export class AddLaptop implements OnInit {
  newLaptop = new Laptop();
  models!: Model[];
  newIdModel!: number;

  uploadedImage!: File;
  imagePath: any;

  constructor(private laptopService: LaptopService, private router: Router) {}

  ngOnInit(): void {
    this.laptopService.listeModels().subscribe(data => {
      this.models = data._embedded.models;
      console.log(data);
    });
  }

  addLaptop() {
    this.newLaptop.model = this.models.find(m => m.idModel == this.newIdModel)!;
    this.laptopService.ajouterLaptop(this.newLaptop).subscribe((laptop) => {
      this.laptopService.uploadImageFS(this.uploadedImage, this.uploadedImage.name, laptop.idLaptop)
        .subscribe((response: any) => {});
      this.router.navigate(['laptops']);
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}
