import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { CardApiService } from '../../services/card-api.service';
import { CardsStateSaverService } from '../../services/cards-state-saver.service';
import { CardDto } from '../card/card.models';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent {
  public readonly cards$: Observable<CardDto[]>;

  public readonly flippedCardIds: number[] = this.cardsStateSaver.getFlippedCards();

  private readonly disabledCardsForClick: number[] = [];

  private readonly update$ = new Subject<void>();

  constructor(private readonly cardApiService: CardApiService,
              private readonly cardsStateSaver: CardsStateSaverService) {
    this.cards$ = this.update$.pipe(
      startWith(0),
      switchMap(() => cardApiService.getCardList()),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

  public toggleCard(cardId: number): void {
    if (this.disabledCardsForClick.includes(cardId)) {
      return;
    }

    this.disabledCardsForClick.push(cardId);
    const index = this.flippedCardIds.findIndex((id) => id === cardId);
    if (index !== -1) {
      this.flippedCardIds.splice(index, 1);
    } else {
      this.flippedCardIds.push(cardId);
    }

    this.cardsStateSaver.setFlippedCards(this.flippedCardIds);

    setTimeout(() => {
      const idx = this.disabledCardsForClick.findIndex((id) => id === cardId);
      if (idx !== -1) {
        this.disabledCardsForClick.splice(idx, 1);
      }
    }, 1000);
  }

  public isFlipped(cardId: number): boolean {
    return this.flippedCardIds.includes(cardId);
  }

  public update(): void {
    this.update$.next();
  }

  public deleteCard(): void {
    this.update();
  }

  public flipAllCards(): void {
    this.disabledCardsForClick.push(...this.flippedCardIds);
    this.flippedCardIds.splice(0);
    this.cardsStateSaver.setFlippedCards([]);
    setTimeout(() => {
      this.disabledCardsForClick.splice(0);
    }, 1000);
  }
}
