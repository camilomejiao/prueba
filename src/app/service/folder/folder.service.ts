import { Injectable } from '@angular/core';

//IP global
import { GLOBAL } from '../global';

//Modelo
import { Folder } from '../../models/folder';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { map } from 'rxjs/operator/map';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Router, Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  public url: String;

  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    this.url = GLOBAL.url;
  }

  listarFolders(){
    let url = this.url + 'folders';
    return this._http.get(url).map(
      (resp: any) =>{
        return resp;
    });
  }

  listarFoldersall(){
    let url = this.url + 'folders/allFolders';
    return this._http.get(url).map(
      (resp: any) => {
        return resp;
      });
  }

  listarFolder(id) {
    let url = this.url + 'folders/' + id;
    return this._http.get(url).map(
      (resp: any) => {
        return resp;
      });
  }

  eliminarFolder(folder) {
    let id = folder.id;
    let url = this.url + 'folders/' + id;
    return this._http.delete(url).map(
      (resp: any) => {
        return resp;
      });
  }

  crearFolder(carpeta){
    let id = carpeta.id;

    if (id != '' && id != undefined) {
      let url = this.url + 'folders/' + id;
      return this._http.put(url, carpeta).map(
        (resp: any) => {
          return resp;
        });
    } else {
      let url = this.url + 'folders';
      return this._http.post(url, carpeta).map(
        (resp: any) => {
          return resp;
        });
    }
  }


}
