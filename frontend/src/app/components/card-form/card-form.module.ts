import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardFormComponent } from './card-form.component';


@NgModule({
  declarations: [
    CardFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CardFormModule { }
