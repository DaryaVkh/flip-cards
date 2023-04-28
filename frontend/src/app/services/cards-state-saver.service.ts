import { Injectable } from '@angular/core';

const CARDS_STATE_KEY = 'flippedCards';

@Injectable({
  providedIn: 'root'
})
export class CardsStateSaverService {
  public getFlippedCards(): number[] {
    return localStorage.getItem(CARDS_STATE_KEY)?.split(',').filter((id) => id !== '').map(Number) || [];
  }

  public setFlippedCards(cardIds: number[]): void {
    localStorage.setItem(CARDS_STATE_KEY, cardIds.toString());
  }
}
