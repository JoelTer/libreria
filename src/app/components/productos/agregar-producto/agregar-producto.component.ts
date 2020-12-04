import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  articulo = {
    codigoProducto: "",
    nombre: "",
    precio: "",
    stock: "",
    jsonImagenes: []
  }
  imagenesNombres = []
  @Output() salidaOutputR = new EventEmitter();

  constructor(private _producto: ProductosService) { }

  ngOnInit(): void {}

  registrarProducto(f: NgForm){
    let fd = new FormData();
    if ( this.articulo.jsonImagenes.length>0){
      for (let i = 0; i < this.articulo.jsonImagenes.length; i++) {
        fd.append('imagenes', this.articulo.jsonImagenes[i]);
      }
      fd.append("data", JSON.stringify(this.articulo)); 
  
      this._producto.postLibro(fd).then((data:any)=>{
        Swal.fire(
          'Guardado!',
          data.msg,
          'success'
        )
        this.salidaOutputR.emit()
        f.reset()
        this.articulo.jsonImagenes = []
        this.imagenesNombres = []
      }).catch(err=>{
        Swal.fire(
          'ERROR!',
          err.error.msg,
          'error'
        )
      });
    }else{
      Swal.fire(
        'ERROR!',
        'Se debe seleccionar al menos una imagen',
        'warning'
      )
    }

  }

  cargarImagenes(event){
    if(event.target.files.length>0){
      this.articulo.jsonImagenes = []
      this.imagenesNombres = []
      for (const i of event.target.files) {
        var imagen = i as File
        this.articulo.jsonImagenes.push(imagen)
        this.imagenesNombres.push(imagen.name)
      }
    }
  }

}
