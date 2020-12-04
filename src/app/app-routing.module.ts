import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ComponentsRoutingModule } from './components/components.routing';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: '', component: LoginComponent},
  { path: '' , redirectTo: 'login', pathMatch: 'full'}
  // { path: '**', component: NoPageFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ComponentsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
