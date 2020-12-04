import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './componentes.component';

import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComprasComponent } from './compras/compras.component';

const routes: Routes = [
  { path: '', component: PagesComponent,
  children: [
    { path: 'libros', component: ProductosComponent},
    { path: 'carrito', component: CarritoComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'mis-compras', component: ComprasComponent},
    { path: '' , redirectTo: 'dashboard', pathMatch: 'full'}
  ]
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
