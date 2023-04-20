import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
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

  openedCardId: number | null = null;

  constructor(private readonly cardApiService: CardApiService) {
    this.cards$ = cardApiService.getCardList().pipe(
      shareReplay({bufferSize: 1, refCount: true})
    );
  }
}
