import { Component, Input } from '@angular/core';

@Component({
    selector: 'vgr-close-button',
    templateUrl: './close-button.component.html',
    styleUrls: ['./close-button.component.scss'],
    standalone: false
})
export class CloseButtonComponent {
  @Input() disabled = false;

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
