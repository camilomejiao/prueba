import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

//SweetAlert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

//Models
import { Folder } from '../../models/folder';
import { User } from '../../models/user';
//Service
import { FolderService } from '../../service/folder/folder.service';
import { UsuarioService } from '../../service/usuario/usuario.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crearfolders',
  templateUrl: './crearfolders.component.html',
  styles: []
})
export class CrearfoldersComponent implements OnInit {

  folders = [];
  usuarios = [];
  carpetas: Folder = new Folder('','','','') ;

  constructor(
    private _usuarioService: UsuarioService,
    private _folderservice: FolderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id != 'nuevo') {
        this.cargarFolder(id);
      }
    });
  }

  ngOnInit(): void {
    this.listar();
  }

  cargarFolder(id) {
    this._folderservice.listarFolder(id).subscribe(
      resp => {
        console.log(resp.data);
        this.carpetas = resp.data;
      });
  }

  listar() {
    //Listar carpetas
    this._folderservice.listarFoldersall().subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.success == true) {
          this.folders = resp.data;
        }
      });
    //Listar Usuarios
      this._usuarioService.listarUsuarios().subscribe(
        (resp: any) => {
          //console.log(resp);
          if (resp.success == true) {
            this.usuarios = resp.data;
          }
        });
  }

  registerFolders(form){
    //console.log(form.value);
    //console.log(this.carpetas);

    this._folderservice.crearFolder(this.carpetas).subscribe(
      resp => {
        //console.log(resp);
        if (resp.success == true) {
          Swal.fire(
            'Folder Guardado!',
            'success'
          )
          this.router.navigate(['/folders']);
        }
      });
  }

}
