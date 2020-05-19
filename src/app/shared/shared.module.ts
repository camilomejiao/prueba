import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NopagefoundComponent,
    HeaderComponent,
    BreadcrumbsComponent
  ],
  exports: [
    SidebarComponent,
    NopagefoundComponent,
    HeaderComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule {}
