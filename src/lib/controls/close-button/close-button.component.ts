import { Component, Input } from '@angular/core';

@Component({
  selector: 'vgr-close-button',
  templateUrl: './close-button.component.html'
})
export class CloseButtonComponent {
  @Input() disabled = false;
  label = 'stäng';

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
