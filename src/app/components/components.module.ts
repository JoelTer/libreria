import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ComponentsRoutingModule } from './components.routing';
import { PagesComponent } from './componentes.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HeaderComponent } from '../shared/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgregarProductoComponent } from './productos/agregar-producto/agregar-producto.component';
import { ActualizarProductoComponent } from './productos/actualizar-producto/actualizar-producto.component';
import { ImagenViewerComponent } from './imagen-viewer/imagen-viewer.component';
import { ComprasComponent } from './compras/compras.component';

@NgModule({
  declarations: [
    PagesComponent,
    ProductosComponent,
    AgregarProductoComponent,
    ActualizarProductoComponent,
    CarritoComponent,
    HeaderComponent,
    DashboardComponent,
    ImagenViewerComponent,
    ComprasComponent,
  ],
  exports: [
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: []
})
export class ComponentsModule { }
