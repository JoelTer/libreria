import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment.prod';
import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  admin: boolean = false;
  cargando = false;
  productos = [];
  ruta = `${environment.muestraImagen}libros&img=`;
  imagenes = []

  producto = {
    idUsuario: "",
    idProducto: "",
    nmbCantidad: 1,
    nmbTotalProducto: 0
  }
  token:any;
  constructor(private _producto: ProductosService, private _carrito: CarritoService, private router: Router) { }

  ngOnInit(): void {
    if("aut" in localStorage){
      this.token = jwt_decode(localStorage.getItem('aut'));
      this.admin = this.token.persona.blnAdministrador
      this.getLibros()
    } else {
      this.router.navigateByUrl('/login')
    }
    
  }

  cargarDatos(images: any){
    this.imagenes = images;
  }

  getLibros(){
    this.cargando = true;
    this._producto.getLibrosParaUsuarios().then((data:any)=>{
      this.productos = data.cont.productos
      this.cargando = false;
    }).catch(err=>{
      this.cargando = false;
    })
  }

  agregarCarrito(object:any, f:NgForm){
    Swal.fire({
      text: 'Agregando al carrito...',
    });
    Swal.showLoading();
    console.log(object, f.value.nmbCantidad);
    var total = f.value.nmbCantidad * object.nmbPrecio;
    this.producto = {
      idUsuario: this.token.persona._id,
      idProducto: object._id,
      nmbCantidad: f.value.nmbCantidad,
      nmbTotalProducto: total
    }
    console.log(this.producto, "producto");
    this._carrito.postCarrito(this.producto).then((data:any)=>{
      console.log(data);
      Swal.close()
      this.getLibros()
      Toast.fire({
        icon: 'info',
        title: `${data.msg}`,
      });
      
    }).catch(err=>{
      console.log(err);
      Swal.close()
      Toast.fire({
        icon: 'warning',
        title: `${err.error.msg}`
      });
    })
    this.producto = {
      idUsuario: "",
      idProducto: "",
      nmbCantidad: 1,
      nmbTotalProducto: 0
    }
  }

}
