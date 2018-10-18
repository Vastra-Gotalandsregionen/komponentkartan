import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'vgr-save-cancel',
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
