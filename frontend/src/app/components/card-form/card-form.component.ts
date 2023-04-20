import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { CardApiService } from '../../services/card-api.service';
import { REQUIRED_CONTROL_ERROR } from './card-form.models';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFormComponent implements OnDestroy {
  @Output() public added = new EventEmitter<void>();

  public readonly form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  public get titleError(): string | null {
    const titleControl = this.form.get('title');
    if (titleControl && titleControl.touched && titleControl.hasError('required')) {
      return REQUIRED_CONTROL_ERROR;
    }
    return null;
  }

  public get descriptionError(): string | null {
    const descriptionControl = this.form.get('description');
    if (descriptionControl && descriptionControl.touched && descriptionControl.hasError('required')) {
      return REQUIRED_CONTROL_ERROR;
    }
    return null;
  }

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
              private readonly cardApiService: CardApiService) {}

  public submit(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const { title, description } = this.form.value;
      this.cardApiService.addCard({
        title: title ?? '',
        description: description ?? ''
      }).pipe(
        take(1),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.added.emit();
        this.form.reset();
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
