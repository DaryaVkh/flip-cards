import { Injectable } from '@nestjs/common';
import { cards } from 'db/mocks';
import { Card, CardDto } from './card.models';

@Injectable()
export class CardService {
  private readonly cards = cards;

  private lastIdNumber = this.cards.length;

  public getCards(): CardDto[] {
    return this.cards;
  }

  public addCard(newCard: Card): void {
    this.cards.push({
      id: this.lastIdNumber++,
      ...newCard
    });
  }

  public deleteCard(id: number): void {
    const index = this.cards.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.cards.splice(index, 1);
    }
  }
}
