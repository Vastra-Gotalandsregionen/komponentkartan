import { Component, HostBinding, HostListener, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'vgr-list-item-header',
    moduleId: module.id,
    template: `<ng-content></ng-content>`
})

export class ListItemHeaderComponent {
    @HostBinding('class.list-item__header') listItemHeader = true;
    @HostBinding("tabIndex") tabIndex = 0;
    @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() goToFirst: EventEmitter<any> = new EventEmitter();
    @Output() goToLast: EventEmitter<any> = new EventEmitter();
    @HostListener('keydown', ['$event'])
    toggleExpand(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            console.log('toggleExpand');
            this.expandedChanged.emit(true);
            event.preventDefault();
        }
        if (event.keyCode === 36) { //Home

            this.goToFirst.emit();
        }
        if (event.keyCode === 35) { //End
            console.log('toggleExpand');
            this.goToLast.emit();
        }
    }
    constructor(private hostElement: ElementRef, private renderer: Renderer2) {
    }

    setFocus() {
        console.log('hello');
        this.renderer.setAttribute(this.hostElement.nativeElement, 'focus', 'true');
    }




}


