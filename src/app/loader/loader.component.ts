import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-laddningssnurra',
  templateUrl: 'loader.component.html'
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
