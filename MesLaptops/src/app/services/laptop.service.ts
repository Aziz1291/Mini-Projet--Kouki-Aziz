import { Injectable } from '@angular/core';
import { Image, Laptop, Model } from '../model/laptop.model';
import { ModelWrapper } from '../model/model-wrapper.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LaptopService {
  apiURL: string       = environment.laptopsApiURL;
  apiURLModels: string = environment.laptopsModelsURL;

  constructor(private http: HttpClient) { }

  listeLaptops(): Observable<Laptop[]>           { return this.http.get<Laptop[]>(`${this.apiURL}/all`); }
  ajouterLaptop(l: Laptop): Observable<Laptop>   { return this.http.post<Laptop>(`${this.apiURL}/addlaptop`, l); }
  supprimerLaptop(id: number)                    { return this.http.delete(`${this.apiURL}/dellaptop/${id}`); }
  consulterLaptop(id: number): Observable<Laptop>{ return this.http.get<Laptop>(`${this.apiURL}/getbyid/${id}`); }
  updateLaptop(l: Laptop): Observable<Laptop>    { return this.http.put<Laptop>(`${this.apiURL}/updatelaptop`, l); }
  listeModels(): Observable<ModelWrapper>         { return this.http.get<ModelWrapper>(this.apiURLModels); }
  rechercherParModel(id: number): Observable<Laptop[]> { return this.http.get<Laptop[]>(`${this.apiURL}/laptopsmodel/${id}`); }
  rechercherParNom(b: string): Observable<Laptop[]>    { return this.http.get<Laptop[]>(`${this.apiURL}/laptopsbybrand/${b}`); }
  ajouterModel(m: Model): Observable<Model>      { return this.http.post<Model>(this.apiURLModels, { nomModel: m.nomModel }); }
  supprimerModel(id: number)                     { return this.http.delete(`${this.apiURLModels}/${id}`); }
  mettreAJourModel(m: Model): Observable<Model>  { return this.http.put<Model>(`${this.apiURLModels}/${m.idModel}`, m); }

  // ── Image methods ───────────────────────────────────────────────────────────

  /** Upload single image → stored as binary (BLOB) in DB */
  uploadImage(file: File, filename: string): Observable<Image> {
    const fd = new FormData();
    fd.append('image', file, filename);
    return this.http.post<Image>(`${this.apiURL}/image/upload`, fd);
  }

  /** Get image metadata + base64 bytes by image ID */
  loadImage(id: number): Observable<Image> {
    return this.http.get<Image>(`${this.apiURL}/image/get/info/${id}`);
  }

  /** Upload image linked to a laptop (multi-image feature) */
  uploadImageLaptop(file: File, filename: string, idLaptop: number): Observable<Image> {
    const fd = new FormData();
    fd.append('image', file, filename);
    return this.http.post<Image>(`${this.apiURL}/image/uploadImageLaptop/${idLaptop}`, fd);
  }

  /** Delete image by ID */
  supprimerImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/image/delete/${id}`);
  }

  /** Upload image to server filesystem (~/images/{id}.jpg) */
  uploadImageFS(file: File, filename: string, idLaptop: number): Observable<any> {
    const fd = new FormData();
    fd.append('image', file, filename);
    return this.http.post(`${this.apiURL}/image/uploadFS/${idLaptop}`, fd);
  }
}
