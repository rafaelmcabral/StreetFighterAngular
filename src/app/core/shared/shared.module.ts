import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatGridListModule, MatInputModule} from '@angular/material';




@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
  ]
})
export class SharedModule { }
