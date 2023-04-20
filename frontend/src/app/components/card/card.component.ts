import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CardApiService } from '../../services/card-api.service';
import { CardDto } from './card.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnDestroy {
  @Input() card!: CardDto;
  @Input() isFlipped = true;

  @Output() deleted = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly cardApiService: CardApiService) {}

  public deleteCard(): void {
    this.cardApiService.deleteCard(this.card.id).pipe(
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.deleted.emit();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
