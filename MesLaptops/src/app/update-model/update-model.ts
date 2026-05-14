import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Model } from '../model/laptop.model';

@Component({
  selector: 'app-update-model',
  imports: [FormsModule],
  templateUrl: './update-model.html',
  styles: ``
})
export class UpdateModel implements OnInit {

  @Input()
  model!: Model;

  @Input()
  ajout!: boolean;

  @Output()
  modelUpdated = new EventEmitter<Model>();

  @Output()
  cancelled = new EventEmitter<void>();

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateModel', this.model);
  }

  saveModel() {
    this.modelUpdated.emit(this.model);
  }

  cancel() {
    this.cancelled.emit();
  }
}
