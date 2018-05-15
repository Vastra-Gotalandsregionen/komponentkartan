import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';

@Component({
  selector: 'vgr-lock-button',
  templateUrl: './lock-button.component.html'
})
export class LockButtonComponent {
  @Input() disabled = false;
  @Input() unlocked: boolean;
  @Output() lockChanged = new EventEmitter<boolean>();

  get label(): string {
    return this.unlocked ? 'lås' : 'lås upp';
  }
  get locked(): boolean {
    return !this.unlocked;
  }

  toggleLocked() {
    if (!this.disabled) {
      if (this.unlocked) {
        this.lock();
      } else {
        this.unlock();
      }
    }
  }

  lock() {
    this.unlocked = false;
    this.lockChanged.emit(this.locked);
  }

  unlock() {
    this.unlocked = true;
    this.lockChanged.emit(this.locked);
  }

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
