import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-imagen-viewer',
  templateUrl: './imagen-viewer.component.html',
  styleUrls: ['./imagen-viewer.component.css']
})
export class ImagenViewerComponent implements OnInit {

  ruta = `${environment.muestraImagen}libros&img=`;
  nombreArticulo:string;
  imagenes:any = []

  @Input() set objeto(value:any){
    this.nombreArticulo = value.strNombre;
    
  }
  @Input() set img(value: any){
    this.imagenes = value
  }
  constructor() { }

  ngOnInit(): void {}

}
