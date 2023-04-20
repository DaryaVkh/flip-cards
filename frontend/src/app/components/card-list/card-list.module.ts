import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardFormModule } from '../card-form/card-form.module';
import { CardModule } from '../card/card.module';
import { CardListComponent } from './card-list.component';


@NgModule({
  declarations: [
    CardListComponent
  ],
  exports: [
    CardListComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    CardFormModule
  ]
})
export class CardListModule { }
