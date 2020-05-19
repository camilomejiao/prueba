import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Importante para cargar los modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Rutas
import { AppRouteModule, routing, appRoutingProviders } from './app.routes';

//IMportamos el modulo general
import { PagesModule } from './admin/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { LoginGuardGuard } from './service/guards/login-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouteModule,
    routing,
    PagesModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    LoginGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
