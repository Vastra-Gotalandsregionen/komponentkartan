import { Component, HostBinding, Input, ElementRef, AfterContentInit } from '@angular/core';

@Component({
    selector: 'vgr-card-section',
    moduleId: module.id,
    templateUrl: './cardSection.component.html'
})
export class CardSectionComponent implements AfterContentInit {
    @HostBinding('class.card-section') cardSectionClass = true;
    @HostBinding('class.card-section--expanded') private _expanded: boolean;
    @Input() @HostBinding('class.card-section--readonly') readonly: boolean;
    @Input() title: string;
    @Input() subtitle: string;
    @Input() set expanded(value: boolean) {
        this._expanded = value;
        this.setContentOpenOrClosed();
    }
    get expanded(): boolean {
        return this._expanded;
    }

    private setContentOpenOrClosed() {
        if (this._expanded) {
            $(this.elementRef.nativeElement).children('.card-section__content').slideDown(400);
        } else {
            $(this.elementRef.nativeElement).children('.card-section__content').slideUp(400);
        }
    }
    ngAfterContentInit() {
        setTimeout(() => {
            this.setContentOpenOrClosed();
        }, 10);
    }
    constructor(private elementRef: ElementRef) {
        this.readonly = true;
    }

}
