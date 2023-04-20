import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFormComponent {
  readonly form = this.fb.group({
    title: '',
    description: ''
  });

  constructor(private readonly fb: FormBuilder) {}
}
