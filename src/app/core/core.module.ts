import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './containers/layout/layout.component';
import { HomeComponent } from './containers/home/home.component';


@NgModule({
  declarations: [LayoutComponent, HomeComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ]
})
export class CoreModule { }
