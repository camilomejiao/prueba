import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

//Importante para cargar los modulos
import { HttpClientModule } from '@angular/common/http';

import { PagesadminComponent } from './pages-admin.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FoldersComponent } from './folders/folders.component';
import { CrearusuariosComponent } from './usuarios/crearusuarios.component';
import { CrearfoldersComponent } from './folders/crearfolders.component';

@NgModule({
  declarations: [
    PagesadminComponent,
    DashboardComponent,
    UsuariosComponent,
    FoldersComponent,
    CrearusuariosComponent,
    CrearfoldersComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule
  ]

})
export class PagesModule { }
