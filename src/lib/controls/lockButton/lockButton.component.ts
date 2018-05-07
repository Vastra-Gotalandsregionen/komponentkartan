import { Component, Input, EventEmitter, Output, HostBinding, Renderer, ElementRef, AfterViewInit } from '@angular/core';
import { ButtonBaseComponent } from '../button-base/button-base.component';

@Component({
    selector: 'vgr-lock-button',
    moduleId: module.id,
    templateUrl: './lockButton.component.html'
})
export class LockButtonComponent extends ButtonBaseComponent implements AfterViewInit {
    @Input() unlocked: boolean;
    @Output() lockChanged = new EventEmitter<boolean>();

    public lockButton: any;

    constructor(private renderer: Renderer, private elementRef: ElementRef) {
        super();
    }

    get label(): string {
        return this.unlocked ? 'lås' : 'lås upp';
    }
    get locked(): boolean {
        return !this.unlocked;
    }

    ngAfterViewInit() {
        this.lockButton = this.elementRef.nativeElement.querySelector('.lock-button');
    }

    onClick(event: any): void {
        if (this.renderer) {
            this.renderer.invokeElementMethod(this.lockButton, 'focus');
        }
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

    onKeydown(event: KeyboardEvent): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.onClick(event);
            event.preventDefault();
        }
    }
}
