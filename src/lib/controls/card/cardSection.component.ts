import { Component, HostBinding, Input, ElementRef, AfterContentInit } from '@angular/core';

@Component({
    selector: 'vgr-card-section',
    moduleId: module.id,
    templateUrl: './cardSection.component.html'
})
export class CardSectionComponent {
    @HostBinding('class.card-section') cardSectionClass = true;
    @HostBinding('class.card-section--expanded') private _expanded: boolean;
    @Input() @HostBinding('class.card-section--readonly') readonly: boolean;
    @Input() title: string;
    @Input() subtitle: string;
    @Input() set expanded(value: boolean) {
        this._expanded = value;
    }
    get expanded(): boolean {
        return this._expanded;
    }

    constructor(private elementRef: ElementRef) {
        this.readonly = true;
    }

}
