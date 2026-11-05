import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Model } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';
import { UpdateModel } from '../update-model/update-model';

@Component({
  selector: 'app-liste-models',
  standalone: true,
  imports: [CommonModule, UpdateModel],
  templateUrl: './liste-models.html',
  styles: ``
})
export class ListeModels implements OnInit {
  models!: Model[];
  updatedModel: Model = { idModel: 0, nomModel: '' };
  ajout: boolean = true;

  constructor(private laptopService: LaptopService) { }

  ngOnInit(): void {
    this.chargerModels();
  }

  chargerModels() {
    this.laptopService.listeModels().subscribe((data: any) => {
      this.models = data._embedded.models;
    });
  }

  modelUpdated(model: Model) {
    if (this.ajout) {
      this.laptopService.ajouterModel(model).subscribe(() => {
        this.chargerModels();
        this.updatedModel = { idModel: 0, nomModel: '' };
      });
    } else {
      this.laptopService.mettreAJourModel(model).subscribe(() => {
        this.chargerModels();
        this.ajout = true;
        this.updatedModel = { idModel: 0, nomModel: '' };
      });
    }
  }

  updateMod(model: Model) {
    this.updatedModel = { ...model };
    this.ajout = false;
  }

  onCancel() {
    this.ajout = true;
    this.updatedModel = { idModel: 0, nomModel: '' };
  }

  supprimerModel(model: Model) {
    const conf = confirm(`Supprimer le modèle "${model.nomModel}" ?`);
    if (conf) {
      this.laptopService.supprimerModel(model.idModel).subscribe(() => {
        this.chargerModels();
      });
    }
  }
}
