import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = `${environment.url}/libros`;
  constructor(private http: HttpClient) { }

  getLibros(){
    return this.http.get(this.url).toPromise();
  }
  getLibrosParaUsuarios(){
    return this.http.get(`${this.url}/paraUsuario`).toPromise();
  }

  postLibro(articulo:any){
    return this.http.post(this.url,articulo).toPromise()
  }

  putLibro(articulo:any){
    return this.http.put(this.url,articulo).toPromise()
  }


  deleteLibro(articulo:any){
    console.log(articulo);
    return this.http.delete(this.url,{params: articulo}).toPromise()
  }
}
