import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { CardApiService } from '../../services/card-api.service';
import { CardDto } from '../card/card.models';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent {
  readonly cards$: Observable<CardDto[]>;

  public openedCardId: number | null = null;
  public disabledCardIdForClick: number | null = null;

  private readonly update$ = new Subject<void>();

  constructor(private readonly cardApiService: CardApiService) {
    this.cards$ = this.update$.pipe(
      startWith(0),
      switchMap(() => cardApiService.getCardList()),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

  public toggleCard(cardId: number): void {
    if (this.disabledCardIdForClick === cardId) {
      return;
    }

    this.disabledCardIdForClick = cardId;
    if (this.openedCardId === cardId) {
      this.openedCardId = null;
    } else {
      this.openedCardId = cardId;
    }

    setTimeout(() => {
      if (this.disabledCardIdForClick === cardId) {
        this.disabledCardIdForClick = null;
      }
    }, 1000);
  }

  public update(): void {
    this.update$.next();
  }

  public deleteCard(): void {
    this.update();
  }
}
