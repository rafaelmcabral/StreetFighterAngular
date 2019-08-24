import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './containers/layout/layout.component';
import { HomeComponent } from './containers/home/home.component';
import { SharedModule } from './shared/shared.module';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './containers/login/login.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers/feature.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CoreEffects} from './store/effects/core.effects';
import {AuthEffects} from './store/effects/auth.effects';


@NgModule({
  declarations: [LayoutComponent, HomeComponent, LoginComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    StoreModule.forFeature('core', reducers),
    EffectsModule.forFeature([CoreEffects, AuthEffects])
  ],
  providers: [AuthGuard]
})
export class CoreModule { }
