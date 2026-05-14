export class Model {
  idModel! : number;
  nomModel! : string;
}

export class Image {
  idImage!: number;
  name!: string;
  type!: string;
  image!: number[];
}

export class Laptop {
  idLaptop! : number;
  brandLaptop! : string;
  prixLaptop! : number;
  caracteristiquesLaptop! : string;
  dateCreation! : Date;
  model! : Model;
  image!: Image;
  imageStr!: string;
  images!: Image[];
  imagePath!: string;
}
