import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = `${environment.url}/usuarios`;

  constructor(private http: HttpClient) { }

  login(strCorreo: string, strPassword: string){
    return this.http.get(this.url+'/login', { params: { strPassword, strCorreo}}).toPromise();
  }

  registrarUsuario(usuario:any){
    return this.http.post(this.url, usuario).toPromise()
  }
}
