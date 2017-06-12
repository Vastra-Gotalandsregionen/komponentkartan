import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "vgr-lock-button",
    moduleId: module.id,
    templateUrl: "./lockButton.component.html"
})
export class LockButtonComponent {
    @Input() disabled: boolean;
    @Input() unlocked: boolean;

    @Output() onLocked = new EventEmitter<string>();
    @Output() onUnlocked = new EventEmitter<string>();



    buttonClicked(): void {
        if (!this.disabled) {
            if (this.unlocked)
                this.lock();
            else
                this.unlock();
        }
    }

    lock() {
        this.unlocked = false;
        this.onLocked.emit();
    }

    unlock() {
        this.unlocked = true;
        this.onUnlocked.emit();
    }

    keyPressed(event: KeyboardEvent): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.buttonClicked();
        }
    }
}