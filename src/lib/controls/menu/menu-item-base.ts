import { ElementRef, Renderer, Output, EventEmitter } from '@angular/core';

export abstract class MenuItemBase {
    @Output() home: EventEmitter<null> = new EventEmitter();
    @Output() end: EventEmitter<null> = new EventEmitter();
    @Output() escape: EventEmitter<null> = new EventEmitter();
    @Output() arrowUp: EventEmitter<null> = new EventEmitter();
    @Output() arrowDown: EventEmitter<null> = new EventEmitter();

    constructor(protected elementRef: ElementRef, private renderer: Renderer) {
    }

    setFocus(movingUp: boolean = false) {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.firstElementChild, 'focus');
    }
}