import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'vgr-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnChanges {
  @Input() disabled = false;
  @Input() buttonStyle = 'primary';
  @Input() type = 'button';
  reenabled = false;
  private wasDisabled = false;

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
