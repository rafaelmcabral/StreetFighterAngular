import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoreModule} from './core/core.module';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'core'},
  {path: 'core', loadChildren: () => CoreModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
