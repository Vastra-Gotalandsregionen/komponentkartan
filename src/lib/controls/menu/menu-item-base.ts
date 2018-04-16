import { ElementRef, Renderer, Output, EventEmitter } from '@angular/core';

export class MenuItemBase {
    @Output() goToFirst: EventEmitter<null> = new EventEmitter();
    @Output() goUp: EventEmitter<null> = new EventEmitter();
    @Output() goDown: EventEmitter<null> = new EventEmitter();

    constructor(protected elementRef: ElementRef, private renderer: Renderer) {
    }

    setFocus(movingUp: boolean = false) {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.firstElementChild, 'focus');
    }
}