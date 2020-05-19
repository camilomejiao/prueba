import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

//SweetAlert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
//Model
import { User } from '../../models/user';
//Service
import { UsuarioService } from '../../service/usuario/usuario.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crearusuarios',
  templateUrl: './crearusuarios.component.html',
  styles: []
})
export class CrearusuariosComponent implements OnInit {

  usuarios: User = new User('','','','','','','','USER');
  id2: any;
  constructor(
    private _usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if (id != 'nuevo') {
        this.cargarUsuario(id);
      }
    });
   }

  ngOnInit(): void {

  }

  cargarUsuario(id){
      this._usuarioService.listarUsuario(id).subscribe(
        resp =>{
          //console.log(resp.data);
          this.usuarios = resp.data;
      });
  }

  registerUsers(form: NgForm){
    //console.log(form);
    //console.log(this.usuarios);
    this._usuarioService.register2(this.usuarios).subscribe(
        resp =>{
          console.log(resp);
          if (resp.success == true) {
            Swal.fire(
              'Usuario Guardado!',
              'success'
            )
            this.router.navigate(['/users']);
          }
    },
     error => {
        //console.log(<any>error.status);
        if (<any>error.status == 500) {
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
      });


  }

}
