import { Component, HostBinding, Input, Output, EventEmitter, HostListener, ElementRef, Renderer } from '@angular/core';

@Component({
    selector: 'vgr-list-item-content',
    template: `<ng-content></ng-content>`
})

export class ListItemContentComponent {
    @Output() goUp: EventEmitter<any> = new EventEmitter();
    @Output() goDown: EventEmitter<any> = new EventEmitter();
    @HostBinding('class.list-item__content') listItemContent = true;
    @HostBinding('class.list-item__content--indent') get addPaddingClass() { return this.indentContent; }

    @Input() indentContent = true;

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === 'PageUp') {
            this.goUp.emit();
            event.preventDefault();
        }
        if (event.ctrlKey && event.key === 'PageDown') {
            this.goDown.emit();
            event.preventDefault();
        }
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }

    setFocus() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus');
    }
}
