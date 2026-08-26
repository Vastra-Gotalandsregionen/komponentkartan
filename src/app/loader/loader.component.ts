import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-laddningssnurra',
    templateUrl: 'loader.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class LoaderComponent {
  title = 'app';
  actionInProgress = false;

  get buttonText(): string {
    if (!this.actionInProgress) {
      return 'Start';
    } else {
      return 'Stop';
    }
  }
}
