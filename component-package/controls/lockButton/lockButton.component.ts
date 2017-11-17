import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core'

@Component({
    selector: 'vgr-lock-button',
    moduleId: module.id,
    templateUrl: './lockButton.component.html'
})
export class LockButtonComponent {
    @HostBinding('class.button') buttonClass = true;
    @Input() disabled = false;
    @Input() unlocked: boolean;
    @Output() lockChanged = new EventEmitter<boolean>();

    get label(): string {
        return this.unlocked ? 'lås' : 'lås upp';
    }
    get locked(): boolean {
        return !this.unlocked;
    }
    onClick(event: any): void {
        event.cancelBubble = true;
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

    keyPressed(event: KeyboardEvent): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.onClick(event);
            event.preventDefault();
        }
    }
}
