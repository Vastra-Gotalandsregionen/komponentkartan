import { Component, Input, EventEmitter, Output, QueryList, OnInit } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { LockButtonComponent } from '../lock-button/lock-button.component';

@Component({
  selector: 'vgr-save-cancel',
  moduleId: module.id,
  templateUrl: './save-cancel.component.html'
})
export class SaveCancelComponent implements OnInit {
  @Input() locked = true;
  @Input() secondary = false;
  @Input() hideLock = false;
  @Input() saveButtonText = 'Spara';
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() unlock = new EventEmitter();

  ngOnInit() {
    if (this.hideLock) {
      this.locked = false;
    }
  }

  onLockChanged(locked: boolean) {
    if (locked) {
      this.locked = true;
      this.save.emit();

    } else {
      this.locked = false;
      this.unlock.emit();
    }
  }

  onSave() {
    if (!this.hideLock) {
      this.locked = true;
    }
    this.save.emit();
  }

  onCancel() {
    if (!this.hideLock) {
      this.locked = true;
    }
    this.cancel.emit();
  }

}
