import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment.prod';
import { ComprasService } from '../../services/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  token:any
  compras = []
  ruta = `${environment.muestraImagen}libros&img=`;
  detalle = []
  constructor(private router: Router, private _compras: ComprasService) { }

  ngOnInit(): void {
    if("aut" in localStorage){
      this.token = jwt_decode(localStorage.getItem('aut'));

      if(this.token.persona.blnAdministrador){
        this.router.navigateByUrl('/dashboard')
      }else{
        this.getCompras()

      }
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  verDetalles(value){
    this.detalle = value
  }

  getCompras(){
    this._compras.getCompras(this.token.persona._id).then((data:any)=>{
      console.log(data);
      this.compras = data.cont.compras
    }).catch(err=>{
      console.log(err);
    })
  }

}
