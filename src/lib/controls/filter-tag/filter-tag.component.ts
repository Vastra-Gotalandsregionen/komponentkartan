import { Component, Output, EventEmitter, ViewChild, ElementRef, Renderer, HostListener } from '@angular/core';
import { ButtonBaseComponent } from '../button-base/button-base.component';

@Component({
    selector: 'vgr-filter-tag',
    moduleId: module.id,
    templateUrl: './filter-tag.component.html'
})
export class FilterTagComponent extends ButtonBaseComponent {
    @Output() next = new EventEmitter();
    @Output() previous = new EventEmitter();
    @ViewChild('filtertag') filtertag: ElementRef;

    constructor(private renderer: Renderer) {
        super();
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft' || event.key === 'Left' || event.key === 'ArrowUp' || event.key === 'Up') {
            this.previous.emit();
        } else if (event.key === 'ArrowRight' || event.key === 'Right' || event.key === 'ArrowDown' || event.key === 'Down') {
            this.next.emit();
        }
    }

    setFocus() {
        this.renderer.invokeElementMethod(this.filtertag.nativeElement, 'focus');
    }
}
