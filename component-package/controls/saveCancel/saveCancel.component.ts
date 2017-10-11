import { Component, Input, EventEmitter, Output, ViewChildren, QueryList, OnChanges, ViewChild } from '@angular/core'

import { ButtonComponent } from '../button/button.component';
import { LockButtonComponent } from '../lockButton/lockButton.component';

@Component({
    selector: 'vgr-save-cancel',
    moduleId: module.id,
    templateUrl: './saveCancel.component.html'
})
export class SaveCancelComponent implements OnChanges {
    @Input() enabled: boolean;



    @ViewChildren(ButtonComponent) textButtonComponents: QueryList<ButtonComponent>;
    @ViewChild(LockButtonComponent) lockButtonComponent: LockButtonComponent;
    @Input() secondary: boolean;

    @Output() onCancel = new EventEmitter();
    @Output() onSave = new EventEmitter();
    @Output() onUnlock = new EventEmitter();

    saveCancelEnabled: boolean;

    constructor() {
        this.saveCancelEnabled = false;
    }

    ngOnChanges() {
        if (!this.textButtonComponents || !this.lockButtonComponent) {
            return;
        }
        if (this.enabled) {
            this.textButtonComponents.forEach(x => x.disabled = false);
            this.lockButtonComponent.unlock();
        } else {
            this.textButtonComponents.forEach(x => x.disabled = true);
            this.lockButtonComponent.lock();
        }
    }

    onUnlocked() {
        this.saveCancelEnabled = true;
        this.onUnlock.emit();
    }

    onLocked() {
        this.saveCancelEnabled = false;
        this.onSave.emit();
    }

    save() {
        this.lockButtonComponent.lock();
        this.onSave.emit();
    }

    cancel() {
        this.lockButtonComponent.lock();
        this.onCancel.emit();
    }

    unlock() {
        this.lockButtonComponent.unlock();
    }

    consoleLog(logText: string) {
        console.log(logText);
    }
}
