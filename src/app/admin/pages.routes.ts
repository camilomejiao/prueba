import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesadminComponent } from './pages-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginGuardGuard } from '../service/guards/login-guard.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FoldersComponent } from './folders/folders.component';
import { CrearusuariosComponent } from './usuarios/crearusuarios.component';
import { CrearfoldersComponent } from './folders/crearfolders.component';

const pagesAdminRoutes: Routes = [
  {
    path: '',
    component: PagesadminComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsuariosComponent },
      { path: 'registrarUsuarios', component: CrearusuariosComponent },
      { path: 'registrarUsuarios/:id', component: CrearusuariosComponent },
      { path: 'folders', component: FoldersComponent },
      { path: 'registrarfolders', component: CrearfoldersComponent },
      { path: 'registrarfolders/:id', component: CrearfoldersComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]
  },
]

export const PAGES_ROUTES = RouterModule.forChild(pagesAdminRoutes);
