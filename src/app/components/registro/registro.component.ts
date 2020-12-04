import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario = {
    strNombre: '',
    strPrimerApellido: '',
    strSegundoApellido: '',
    strCorreo: '',
    strPassword: '',
    blnAdministrador: false
  }
  constructor(private _usuario: UsuariosService) { }

  ngOnInit(): void {
  }

  registrarUsuario(f: NgForm){
    this.usuario = {
      strNombre: f.value.strNombre,
      strPrimerApellido: f.value.strPrimerApellido,
      strSegundoApellido: f.value.strSegundoApellido,
      strCorreo: f.value.strCorreo,
      strPassword: f.value.strPassword,
      blnAdministrador: false
    }
    this._usuario.registrarUsuario(this.usuario).then((data:any)=>{
      console.log(data);
      Swal.fire(
        "Registrado",
        data.msg,
        "success"
      )
    }).catch(err=>{
      Swal.fire(
        "Error al registrar",
        err.error.msg,
        "error"
      )
    })
  }

}
