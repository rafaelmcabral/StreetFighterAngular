import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FightersComponent} from './containers/fighters/fighters.component';
import {FighterComponent} from './containers/fighter/fighter.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'fighters'},
  {path: 'fighters', component: FightersComponent},
  {path: 'fighter', component: FighterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreetFighterRoutingModule { }
