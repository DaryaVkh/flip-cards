import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
    CardModule
  ]
})
export class CardListModule { }
