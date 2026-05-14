import { Model } from './laptop.model';

export class ModelWrapper {
  _embedded!: { models: Model[] };
}
