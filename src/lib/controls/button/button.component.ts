import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'vgr-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnChanges {
  @Input() disabled = false;
  @Input() secondary = false;
  @Input() type = 'button';
  lastDisabledStatus: boolean;
  reenabled: boolean;

  ngOnChanges() {
    this.reenabled = this.lastDisabledStatus === true && this.disabled === false;
    this.lastDisabledStatus = this.disabled;
  }

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
