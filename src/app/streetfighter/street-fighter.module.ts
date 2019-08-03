import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreetFighterRoutingModule } from './street-fighter-routing.module';
import { FightersComponent } from './containers/fighters/fighters.component';
import { FighterComponent } from './containers/fighter/fighter.component';
import { FighterListComponent } from './components/fighter-list/fighter-list.component';
import { FighterDetailComponent } from './components/fighter-detail/fighter-detail.component';
import {SharedModule} from '../core/shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {fighterReducer} from './store/reducers/global.reducer';


@NgModule({
  declarations: [FightersComponent, FighterComponent, FighterListComponent, FighterDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    StreetFighterRoutingModule,
    StoreModule.forFeature('fighter', fighterReducer)
  ]
})
export class StreetFighterModule { }
