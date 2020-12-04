import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  url = `${environment.url}/carrito`;
  constructor( private http: HttpClient ) { }

  getAllProductos(idUsuario:string){
    return this.http.get(this.url, { params: { idUsuario } }).toPromise();
  }

  postCarrito(carrito:any){
    return this.http.post(this.url, carrito).toPromise();
  }

  deleteCarrito(idUsuario:string, idProducto:string){
    return this.http.delete(this.url, {params: {idProducto, idUsuario}}).toPromise()
  }

  deleteLimpiarCarrito(idUsuario:string){
    return this.http.delete(`${this.url}/vaciarCarrito`, {params: {idUsuario}}).toPromise()
  }
}
