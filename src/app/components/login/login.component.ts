import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
// import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  
});
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    strPassword: '',
    strCorreo: ''
  }
  constructor(private router: Router, private _service: UsuariosService) { }

  ngOnInit(): void {
    if("aut" in localStorage){
      this.router.navigateByUrl('/dashboard')
    }
  }

  iniciarSesion(f: NgForm){
    this._service.login(this.login.strCorreo,this.login.strPassword).then((data:any)=>{
      localStorage.setItem('aut', data.cont.token);
      this.router.navigateByUrl('/dashboard')
    }).catch(err=>{
      Toast.fire({
        icon: 'error',
        title: `${err.error.msg}`,
      });
    })

  }

}
