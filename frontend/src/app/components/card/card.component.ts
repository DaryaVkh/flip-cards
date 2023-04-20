import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardDto } from './card.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() card!: CardDto;
  @Input() isFront = false;
}
