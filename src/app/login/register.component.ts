import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//SweetAlert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
//Modelo
import { User } from '../models/user';
//Service
import { UsuarioService } from '../service/usuario/usuario.service';

import { Router } from '@angular/router';

//declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class RegisterComponent implements OnInit {

  //Instanciamos el formulario
  formularioRegister: FormGroup;
  //La respuesta status
  public status: String;
  //El modelo
  public user: User;

  constructor(
    //private _http: HttpClient,
    private _usuarioService: UsuarioService,
    private router: Router
  ) {
   this.user = new User('', '', '', '', '', '', '', 'USER');
  }

  ngOnInit(): void {
    //init_plugins();

    //Iniciamos el formulario
    this.formularioRegister = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required ),
      tipoidentificacion: new FormControl(null, Validators.required),
      numeroidentificacion: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
    },
    {
      validators: this.password('password', 'password2')
    });

    //Para llenar el formulario y no estar escribiendo varias veces lo mismo
    this.formularioRegister.setValue({
      name: 'Ana Milena',
      lastname: 'Mejia Ortiz',
      tipoidentificacion: 'CC',
      numeroidentificacion: '1014208667',
      email: 'milena0328@gmail.com',
      password: '123456',
      password2: '123456',
    });

  }

  //Funcion para validar si las contraseñas son iguales
  password( campo1: string, campo2: string){

    return(group: FormGroup) => {
      let password  = group.controls[campo1].value;
      let password2 = group.controls[campo2].value;

      if ( password === password2) {
        return null;
      }

      return {
        password: true
      };
    };

  }

  registrarUsuario(){

    if (this.formularioRegister.invalid) {
      return;
    }
    //console.log(this.formularioRegister.value);

    this._usuarioService.register(this.formularioRegister.value).subscribe(
      response =>{
        console.log(response.data, response.success);
        if (response.success == true) {
          this.status = 'success';
          Swal.fire(
            'Bienvenido!',
            'success'
          )
          //Resetear, formulario
          this.formularioRegister.reset();
          this.router.navigate(['/login']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ya se encuentra registrado'
          })
        }
      },
      error => {
        //console.log(<any>error.status);
        if (<any>error.status == 500) {
          this.status = 'error';
          Swal.fire({
            icon: 'error',
            title: 'Ya se encuentra registrado'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ya se encuentra registrado'
          })
        }
      }
    );
  }

}
