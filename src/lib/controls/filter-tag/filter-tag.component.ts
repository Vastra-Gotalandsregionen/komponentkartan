import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ButtonBaseComponent } from '../button-base/button-base.component';

@Component({
    selector: 'vgr-filter-tag',
    templateUrl: './filter-tag.component.html'
})
export class FilterTagComponent extends ButtonBaseComponent {
    @ViewChild('filtertag') filtertag: ElementRef;

    constructor(private renderer: Renderer) {
        super();
    }

    setFocus() {
        this.renderer.invokeElementMethod(this.filtertag.nativeElement, 'focus');
    }
}
