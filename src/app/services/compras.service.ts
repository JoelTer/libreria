import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  url = `${environment.url}/compras`;
  constructor(private http:HttpClient) { }

  getCompras(idPersona){
    return this.http.get(this.url, {params: {_id: idPersona}}).toPromise();
  }
  postCompra(compra:any){
    return this.http.post(this.url, compra).toPromise();
  }
}
