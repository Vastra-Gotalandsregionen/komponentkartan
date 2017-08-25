import { Component, Input, EventEmitter, Output, ViewChildren, QueryList, OnChanges, ViewChild } from '@angular/core'

import { TextButtonComponent } from '../textButton/textButton.component';
import { LockButtonComponent } from '../lockButton/lockButton.component';

@Component({
    selector: 'vgr-save-cancel',
    moduleId: module.id,
    templateUrl: './saveCancel.component.html'
})
export class SaveCancelComponent implements OnChanges {
    @Input() enabled: boolean;



    @ViewChildren(TextButtonComponent) textButtonComponents: QueryList<TextButtonComponent>;
    @ViewChild(LockButtonComponent) lockButtonComponent: LockButtonComponent;

    @Output() onCancel = new EventEmitter<string>();
    @Output() onSave = new EventEmitter<string>();

    saveCancelEnabled: boolean;

    constructor() {
        this.saveCancelEnabled = false;
    }

    ngOnChanges() {
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
