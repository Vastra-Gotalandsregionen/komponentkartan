import { Component, Input } from '@angular/core';

@Component({
  selector: 'vgr-close-button',
  templateUrl: './close-button.component.html'
})
export class CloseButtonComponent {
  @Input() disabled = false;

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
