import { Component, HostBinding, HostListener, Input, Output, EventEmitter, ElementRef, Renderer, AfterViewInit } from '@angular/core';

@Component({
    selector: 'vgr-list-item-header',
    template: `<ng-content></ng-content>`
})

export class ListItemHeaderComponent implements AfterViewInit {
    @HostBinding('class.list-item__header') listItemHeader = true;
    @HostBinding('tabIndex') tabIndex = 0;
    @HostBinding('attr.aria-expanded') expanded = false;
    @HostBinding('attr.role') role = 'button';
    @Output() expandedChanged: EventEmitter<any> = new EventEmitter();
    @Output() goToFirst: EventEmitter<any> = new EventEmitter();
    @Output() goToLast: EventEmitter<any> = new EventEmitter();
    @Output() goUp: EventEmitter<any> = new EventEmitter();
    @Output() goDown: EventEmitter<any> = new EventEmitter();

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === 'Spacebar' || event.key === ' ') {
            this.expandedChanged.emit(true);
            this.expanded = !this.expanded;
            event.preventDefault();
        }
        if (event.key === 'Home') {
            this.goToFirst.emit();
            event.preventDefault();
        }
        if (event.key === 'End') {
            this.goToLast.emit();
            event.preventDefault();
        }
        if ((event.ctrlKey && event.key === 'PageUp') || event.key === 'ArrowUp' || event.key === 'Up') {
            this.goUp.emit();
            event.preventDefault();
        }
        if ((event.ctrlKey && event.key === 'PageDown') || event.key === 'ArrowDown' || event.key === 'Down') {
            this.goDown.emit();
            event.preventDefault();
        }
    }
    @HostListener('click', ['$event'])
    onclick(event: MouseEvent) {
        this.expandedChanged.emit(true);
        this.expanded = !this.expanded;
        event.preventDefault();
    }
    constructor(private hostElement: ElementRef, private renderer: Renderer) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.expanded = this.hostElement.nativeElement.parentNode.parentNode.className.indexOf('list-item--expanded') > 0;
        });
    }

    setFocus() {
        this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }
}


