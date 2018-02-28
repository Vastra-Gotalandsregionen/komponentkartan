import { Component, HostBinding, HostListener, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';

@Component({
    selector: 'vgr-list-item-header',
    moduleId: module.id,
    template: `<ng-content></ng-content>`
})

export class ListItemHeaderComponent {
    @HostBinding('class.list-item__header') listItemHeader = true;
    @HostBinding('tabIndex') tabIndex = 0;
    @Output() expandedChanged: EventEmitter<any> = new EventEmitter();
    @Output() goToFirst: EventEmitter<any> = new EventEmitter();
    @Output() goToLast: EventEmitter<any> = new EventEmitter();
    @Output() goUp: EventEmitter<any> = new EventEmitter();
    @Output() goDown: EventEmitter<any> = new EventEmitter();

    @HostListener('keydown', ['$event'])
    toggleExpand(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) { // enter & space
            this.expandedChanged.emit(true);
            event.preventDefault();
        }
        if (event.keyCode === 36) { // Home
            this.goToFirst.emit();
            event.preventDefault();
        }
        if (event.keyCode === 35) { // End
            this.goToLast.emit();
            event.preventDefault();
        }
        if ((event.ctrlKey && event.keyCode === 33) || event.keyCode === 38) { // Ctrl + PageUp and Arrow Up
            this.goUp.emit();
            event.preventDefault();
        }
        if ((event.ctrlKey && event.keyCode === 34) || event.keyCode === 40) { // PageDown and Arrow Down
            this.goDown.emit();
            event.preventDefault();
        }
    }
    constructor(private hostElement: ElementRef, private renderer: Renderer) {
    }

    setFocus() {

        this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }
}


