﻿import { Input, EventEmitter, Output, HostBinding } from '@angular/core';

export abstract class ButtonBase {
  @HostBinding('class.button') buttonClass = true;
  @Input() disabled = false;
  @Output() click = new EventEmitter();

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
