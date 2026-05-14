import { Component, OnInit } from '@angular/core';
import { Model } from '../model/laptop.model';
import { LaptopService } from '../services/laptop.service';
import { UpdateModel } from '../update-model/update-model';

@Component({
  selector: 'app-liste-models',
  imports: [UpdateModel],
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
      console.log(data);
    });
  }

  modelUpdated(model: Model) {
    console.log('Model updated event', model);
    if (this.ajout) {
      this.laptopService.ajouterModel(model)
        .subscribe(() => {
          this.chargerModels();
          this.updatedModel = { idModel: 0, nomModel: '' };
        });
    } else {
      this.laptopService.mettreAJourModel(model)
        .subscribe(() => {
          this.chargerModels();
          this.ajout = true;
          this.updatedModel = { idModel: 0, nomModel: '' };
        });
    }
  }

  supprimerModel(model: Model) {
    let conf = confirm(`Supprimer le modèle "${model.nomModel}" ?`);
    if (conf) {
      this.laptopService.supprimerModel(model.idModel).subscribe(() => {
        this.chargerModels();
      });
    }
  }

  onCancel() {
    this.updatedModel = { idModel: 0, nomModel: '' };
    this.ajout = true;
  }

  updateMod(model: Model) {
    this.updatedModel = { ...model };
    this.ajout = false;
  }
}
