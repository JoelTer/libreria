import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos = [];
  cargando: boolean = true;
  editar: boolean = false;
  productoOutput = {}
  productoOutputView= {
    jsonImagenes: [],
    nmbPrecio: 30,
    nmbStock: 10,
    strCodigoProducto: "B00",
    strNombre: "CAPt",
  }
  imagenes=[]
  constructor(private _producto: ProductosService, private router: Router) {
    if("aut" in localStorage){
      const token:any = jwt_decode(localStorage.getItem('aut'));
      if(!token.persona.blnAdministrador){
        this.router.navigateByUrl('/dashboard')
      }
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  ngOnInit(): void {
    this.getLibros()
  }

  changeView(value:any){
    this.editar = true;
    this.productoOutput = value;
  }

  getLibros(){
    this.cargando = true;
    this._producto.getLibros().then((data:any)=>{
      this.productos = data.cont.productos
      this.cargando = false;
    }).catch(err=>{
      this.cargando = false;
    })
  }

  eliminarArticulo(value:any){
    Swal.fire({
      title: `¿Estás seguro de eliminar el producto ${value.strNombre}?`,
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._producto.deleteLibro(value).then((data:any)=>{
          Swal.fire(
            "Eliminado!",
            data.msg,
            "success"
          )
          this.getLibros();
        }).catch(err=>{
          Swal.fire(
            "ERROR!",
            err.error.msg,
            "error"
          )
        })
      }
    })
  }

  cargarDatos(value:any, images: any){
    this.productoOutputView = value;
    this.imagenes = images;
  }
  registro(){
    this.editar = false;
  }
  registrado(event){
    this.getLibros()
  }
  actualizado(event){
    this.editar = false;
    this.getLibros()
  }

}
