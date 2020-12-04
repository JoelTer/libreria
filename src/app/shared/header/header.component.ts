import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  admin: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    
    const token:any = jwt_decode(localStorage.getItem('aut'));
    this.admin = token.persona.blnAdministrador
    // console.log(token.persona.blnAdministrador);

  }

  cerrarSesion(){
    console.log("CERRADO");
    localStorage.removeItem('aut')
    this.router.navigateByUrl('/login')
  }

}
