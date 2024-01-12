import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { toggleExpandedState, toggleChevron } from '../../animation';

@Component({
    selector: 'vgr-card-section',
    templateUrl: './cardSection.component.html',
    styleUrls: ['./card.component.scss'],
    animations: [toggleExpandedState, toggleChevron]
})
export class CardSectionComponent {
    @HostBinding('class.card-section') cardSectionClass = true;
    @Input() @HostBinding('class.card-section--expanded') expanded = false;
    @Input() @HostBinding('class.card-section--readonly') readonly = true;
    @Input() title: string;
    @Input() subtitle: string;
    @Input() truncateLength = 30;
    @Input() backgroundColor = '#FFFFFF';
    @ViewChild('cardSectionHeader', { read: ElementRef, static: true }) cardSectionHeader: ElementRef;
    overflow = false;
    animationSpeed = '400ms ease';
    expandOverflow: boolean;

    toggleExpanded(event) {
        if ((event instanceof KeyboardEvent && ['Enter', 'Spacebar', ' '].includes(event.key)) || (event instanceof MouseEvent)) {
            this.overflow = false;
            setTimeout(() => {
                this.expanded = !this.expanded;
            });
            event.preventDefault();
        }
    }

    constructor() { }

    toggleState(state: 'start' | 'done', expanded: boolean) {
      setTimeout(() => {
        if (state === 'done' && expanded === true) {
            this.expandOverflow = false;
        } else {
            this.expandOverflow = true;
        }
      });
    }

    public focus() {
        this.cardSectionHeader.nativeElement.focus();
    }


}
