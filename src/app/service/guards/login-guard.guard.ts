import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ){}

  canActivate (){
    if (this._usuarioService.estaLogueado()) {
      console.log('Esta logueado!');
      return true;
    } else {
      console.log('No Esta logueado!');
      this.router.navigate(['/login']);
      return false;
    }
  }


}
