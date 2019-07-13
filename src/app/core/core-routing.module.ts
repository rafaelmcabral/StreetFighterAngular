import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './containers/layout/layout.component';
import {HomeComponent} from './containers/home/home.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'layout'},
  {path: 'layout', component: LayoutComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomeComponent},
      {path: 'streetfighter', loadChildren:
          () => import('../streetfighter/street-fighter.module').then(mod => mod.StreetFighterModule)}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
