import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';

@Component({
  selector: 'vgr-lock-button',
  templateUrl: './lock-button.component.html',
  styleUrls: ['./lock-button.component.scss']
})
export class LockButtonComponent {
  @Input() disabled = false;
  @Input() locked = true;
  @Output() lockChanged = new EventEmitter<boolean>();

  get label(): string {
    return this.locked ? 'lås upp' : 'lås';
  }

  toggleLocked() {
    if (!this.disabled) {
      this.locked = !this.locked;
      this.lockChanged.emit(this.locked);
    }
  }

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
