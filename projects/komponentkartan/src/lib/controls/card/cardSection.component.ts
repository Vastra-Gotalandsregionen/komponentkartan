import { Component, HostBinding, Input } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
    selector: 'vgr-card-section',
    templateUrl: './cardSection.component.html',
    animations: [
        trigger('toggleExpandedState', [
            transition(':enter', [
                style({ height: '0'}),
                animate('0.4s ease', style({ height: '*' })),
            ]),
            transition(':leave', [
                style({ height: '*'}),
                animate('0.4s ease', style({ height: '0' })),
            ]),
        ]),
        trigger('animateChevron', [
            state('void', style({
                transform: 'rotate(0deg)'
            })),
            state('false', style({
                transform: 'rotate(0deg)'
            })),
            state('true', style({
                transform: 'rotate(-180deg)'
            })),
            transition('* => true', [animate('0.4s ease')]),
            transition('* => false', [animate('0.4s ease')])
        ])
    ]
})
export class CardSectionComponent {
    @HostBinding('class.card-section') cardSectionClass = true;
    @Input() @HostBinding('class.card-section--expanded') expanded = false;
    @Input() @HostBinding('class.card-section--readonly') readonly: boolean;
    @Input() title: string;
    @Input() subtitle: string;
    overflow = false;


    toggleExpanded(event) {
        if ( ( event instanceof KeyboardEvent && event.keyCode === 13 || event.keyCode === 32) || ( event instanceof MouseEvent ) ) {
            this.overflow = false;
            setTimeout(() => {
                this.expanded = !this.expanded;
            });
            event.preventDefault();
        }
    }

    constructor() {
        this.readonly = true;
    }

    allowOverflow() {
        this.overflow = true;
    }

}
