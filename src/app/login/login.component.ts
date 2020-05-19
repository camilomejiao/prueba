import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';

//SweetAlert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

//Modelo
import { User } from '../models/user';
//Service
import { UsuarioService } from '../service/usuario/usuario.service';
import { element } from 'protractor';

declare function init_plugins();
//Cargamos la libreria de Google
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  //La respuesta status
  public status: String;

  auth2: any;

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    //console.log('Componente Login Cargado!');
    //Llamamos la funcion de google
    this.googleInit();
  }

  googleInit(){
    gapi.load('auth2', () =>{
      this.auth2 = gapi.auth2.init({
        client_id: '1013666993265-9g8irupkcjv2o3439u6ltntdlhtg4qsb.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ){
    this.auth2.attachClickHandler( element, {}, (googleUser) =>{
      //Funcion que traer el perfil del susuario
      let profile = googleUser.getBasicProfile();
      //Funcion que trae el token del usuario q le da google
      let token = googleUser.getAuthResponse().id_token;
      //console.log('token' + token);
      if (token != '') {
        Swal.fire(
          'Bienvenido!',
          'success'
        )
        this.router.navigate(['/dashboard']);
      }
      //console.log(profile + ' ' + token);
    });
  }

  ingresar(login: NgForm){
   // console.log(login.value);
    this._usuarioService.login(login.value).subscribe(
      response => {
        console.log(response);
        if (response == true) {
          Swal.fire(
            'Bienvenido!',
            'success'
          )
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        console.log('False',<any>error);
        if (<any>error.status == 401){
          this.status = 'error';
          Swal.fire({
            icon: 'error',
            title: 'Error en la autenticación'
          })
        }
      }
    );

  }



}
