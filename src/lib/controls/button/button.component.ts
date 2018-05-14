import { Component, Input, OnChanges } from '@angular/core';
import { ButtonBase } from '../button-base/button-base';

@Component({
  selector: 'vgr-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent extends ButtonBase implements OnChanges {
  @Input() secondary = false;
  @Input() type = 'button';
  lastDisabledStatus: boolean;
  reenabled: boolean;

  ngOnChanges() {
    this.reenabled = this.lastDisabledStatus === true && this.disabled === false;
    this.lastDisabledStatus = this.disabled;
  }
}
