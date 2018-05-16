import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'vgr-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnChanges {
  @Input() disabled = false;
  @Input() secondary = false;
  @Input() type = 'button';
  reenabled: boolean;
  private wasDisabled: boolean;

  ngOnChanges() {
    this.reenabled = this.wasDisabled && !this.disabled;
    this.wasDisabled = this.disabled;
  }

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
