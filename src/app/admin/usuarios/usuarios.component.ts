import { Component, OnInit } from '@angular/core';
//Importante para que liste
import { CommonModule } from "@angular/common";

//SweetAlert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
//Modelo
import { User } from '../../models/user';
//Service
import { UsuarioService } from '../../service/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  //Creamos el arreglo para los usuarios
  usuarios = [];

  constructor(
    public _usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this._usuarioService.listarUsuarios().subscribe(
      (resp: any) =>{
        console.log(resp.data);
        if (resp.success == true) {
          //Llamamos la variable para pasar lod datos
          this.usuarios = resp.data;
        }
      },
      error =>{
          Swal.fire({
            icon: 'error',
            title: 'No existen usuarios registrados'
          })
      }
    );
    }

  eliminarUsuario(usuario){
    //console.log(usuario);
    let id = usuario.id;
    let id2 = localStorage.getItem('id');

    if (id == id2) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede eliminar usted mismo'
      })
    }

    Swal.fire({
      title: 'Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!!!',
      cancelButtonText: 'No, cancelar!'
    }).then( borrar => {
      if (borrar.value == true) {
        this._usuarioService.eliminarUsuario(usuario).subscribe(
          (resp: any) => {
            if (resp.success == true) {
              Swal.fire(
                'Borrado correctamente!',
                'success'
              )
              this.cargarUsuarios();
            }
          });
      }
    })
  }

}
