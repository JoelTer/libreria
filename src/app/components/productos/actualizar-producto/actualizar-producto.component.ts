import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2'
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  articulo = {
    _id: '',
    strCodigoProducto: "",
    strNombre: "",
    nmbPrecio: "",
    nmbStock: "",
    jsonImagenes: []
  }
  articuloUp = {
    _id: '',
    strCodigoProducto: "",
    strNombre: "",
    nmbPrecio: "",
    nmbStock: "",
    jsonImagenes: [],
    jsonImagenesNew: [],
    jsonImagenesEliminadas: []
  }
  imagen
  imagenesNombres=[]
  @Input() set productoInput(value:any){
    this.articulo = value
    this.articuloUp.jsonImagenes = []
    this.articuloUp._id = this.articulo._id
    this.articuloUp.strCodigoProducto = this.articulo.strCodigoProducto
    this.articuloUp.strNombre = this.articulo.strNombre
    this.articuloUp.nmbPrecio = this.articulo.nmbPrecio
    this.articuloUp.nmbStock = this.articulo.nmbStock
    for (const i of this.articulo.jsonImagenes) {
      this.articuloUp.jsonImagenes.push(i)
    }
    this.imagen = `${environment.muestraImagen}libros&img=${this.articulo.jsonImagenes[0]}`;
  }
  @Output() salidaOutput = new EventEmitter();
  ruta = `${environment.muestraImagen}libros&img=`;

  constructor(private _producto: ProductosService) { }

  ngOnInit(): void {
  }

  actualizarProducto(f: NgForm){
    let fd = new FormData();
    if(this.articuloUp.jsonImagenes.length>0 || this.articuloUp.jsonImagenesNew.length>0){
      for (let i = 0; i < this.articuloUp.jsonImagenesNew.length; i++) {
        fd.append('imagenes', this.articuloUp.jsonImagenesNew[i]);
      }
      fd.append("data", JSON.stringify(this.articuloUp));
      this._producto.putLibro(fd).then((data:any)=>{
        Swal.fire(
          'Actualizado!',
          data.msg,
          'info'
        )
        this.salidaOutput.emit()
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
        'El producto debe tener al menos una imagen',
        'warning'
      )
    }
  }

  eliminarImagen(imagen){
    this.articuloUp.jsonImagenesEliminadas.push(imagen)
    for (let i = 0; i<= this.articuloUp.jsonImagenes.length; i++) {
      if(this.articuloUp.jsonImagenes[i] == imagen){
        this.articuloUp.jsonImagenes.splice(i,1);
      }
    }
  }

  salir(){
    this.salidaOutput.emit()
  }

  // recargar(){
  //   this.articuloUp._id = this.articulo._id
  //   this.articuloUp.strCodigoProducto = this.articulo.strCodigoProducto
  //   this.articuloUp.strNombre = this.articulo.strNombre
  //   this.articuloUp.nmbPrecio = this.articulo.nmbPrecio
  //   this.articuloUp.nmbStock = this.articulo.nmbStock
  //   this.articuloUp.jsonImagenes = []
  //   this.articuloUp.jsonImagenesEliminadas = []
  //   for (const i of this.articulo.jsonImagenes) {
  //     this.articuloUp.jsonImagenes.push(i)
  //   }
  // }

  cargarImagenes(event){
    this.articuloUp.jsonImagenesNew = []
    this.articuloUp.jsonImagenesEliminadas = []
    this.imagenesNombres = []
    for (const i of event.target.files) {
      var imagen = i as File
      this.articuloUp.jsonImagenesNew.push(imagen)
      this.imagenesNombres.push(imagen.name)
    }
  }

}
