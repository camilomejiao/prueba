import { Component, OnInit } from '@angular/core';
//Importante para que liste
import { CommonModule } from "@angular/common";

//SweetAlert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

//Modelo
import { Folder } from '../../models/folder';

//Service
import { FolderService } from '../../service/folder/folder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styles: []
})
export class FoldersComponent implements OnInit {

  //Creamos el arreglo para las carpetas
  folders = [];

  constructor(
    private _folderservice: FolderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarFolders();
  }

  listarFolders(){
    this._folderservice.listarFolders().subscribe(
      (resp: any) =>{
        console.log(resp.data);
        if (resp.success == true){
          this.folders = resp.data;
        }
    });
  }

  eliminarFolder(folder){

    Swal.fire({
      title: 'Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!!!',
      cancelButtonText: 'No, cancelar!'
    }).then(borrar => {
      if (borrar.value == true) {
        this._folderservice.eliminarFolder(folder).subscribe(
          (resp: any) => {
            if (resp.success == true){
              Swal.fire(
                'Borrado correctamente!',
                'success'
              )
              this.listarFolders();
            }
          });
      }
    })
  }

}
