import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment.prod';
import { ComprasService } from '../../services/compras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  token:any
  productos = []
  cargando: boolean = true;
  ruta = `${environment.muestraImagen}libros&img=`;
  total = 0
  compra = {
    idUsuario: '',
    jsonProductos: [
        {
          idProducto: '',
          strNombreProducto: '',
          nmbTotalProducto: 0,
          strImagen:''
        }
    ],
    nmbTotalCompra: 0,
  }

  constructor(private _carrito: CarritoService, private _compras: ComprasService, private router: Router) { 
    if("aut" in localStorage){
      this.token = jwt_decode(localStorage.getItem('aut'));
      if(this.token.persona.blnAdministrador){
        this.router.navigateByUrl('/dashboard')
      }
    } else {
      this.router.navigateByUrl('/login')
    }
    
  }

  ngOnInit(): void {
    // this.productos = this._carrito.getAllProductos();
    this.token = jwt_decode(localStorage.getItem('aut'));
    this.getProductosCarrito()
  }

  comprar(){
    console.log(this.productos);
    this.compra.jsonProductos = []
    this.compra.idUsuario = '';
    this.compra.nmbTotalCompra = 0;

    for (const i of this.productos) {
      console.log(i);
      let producto = {
        idProducto: i.idProducto._id,
        strNombreProducto: i.idProducto.strNombre,
        nmbTotalProducto: i.nmbTotalProducto,
        strImagen:i.idProducto.jsonImagenes[0],
        nmbCantidad: i.nmbCantidad
      }
      this.compra.jsonProductos.push(producto)
    }
    this.compra.idUsuario = this.token.persona._id;
    this.compra.nmbTotalCompra = this.total;
    console.log(this.compra);
    Swal.fire({
      title: `¿Estás seguro que deseas generar la compra?`,
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, comprar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._compras.postCompra(this.compra).then((data:any)=>{
          console.log(data);
          Swal.fire(
            "Compra generada!",
            data.msg,
            "success"
          )
          this.vaciarCarrito();
        }).catch(err=>{
          console.log(err);
          Swal.fire(
            "Error en la compra!",
            err.error.msg,
            "error"
          )
        })
      }
    })
    
  }

  vaciarCarrito(){
    this._carrito.deleteLimpiarCarrito(this.token.persona._id).then((data:any)=>{
      this.productos = []
    }).catch(err=>{
      console.log(err);
    })
  }


  getProductosCarrito(){
    this.cargando = true;
    this._carrito.getAllProductos(this.token.persona._id).then((data:any)=>{
      this.productos = data.cont.carrito;
      for (const i of this.productos) {
        this.total += i.nmbTotalProducto;
      }
      this.cargando = false;
    }).catch(err=>{
      this.productos = []
      this.cargando = false;
    })
  }

  deleteArticulo(idProducto){
    this._carrito.deleteCarrito(this.token.persona._id,idProducto).then((data:any)=>{
      this.getProductosCarrito()
    }).catch(err=>{
      console.log(err);
    })
  }

}
