import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Card, CardDto } from './card/card.models';
import { CardService } from './card/card.service';

@Controller()
export class AppController {
  constructor(private readonly cardService: CardService) {}

  @Get('cards')
  public getCards(): CardDto[] {
    return this.cardService.getCards();
  }

  @Post('cards/add')
  public addCard(@Body() newCard: Card) {
    this.cardService.addCard(newCard);
  }

  @Delete('cards/:id/delete')
  public deleteCard(@Param('id') id: string): void {
    this.cardService.deleteCard(Number(id));
  }
}
