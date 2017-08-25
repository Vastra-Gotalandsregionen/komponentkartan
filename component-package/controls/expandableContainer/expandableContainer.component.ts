import { Component, HostListener, HostBinding } from '@angular/core';

@Component({
    templateUrl: './expandableContainer.component.html',
    selector: 'vgr-expandable-container',
    moduleId: module.id
})
export class ExpandableContainerComponent {
    @HostBinding('class.expandable-container')
    @HostBinding('class.expandable-container--collapsed') hasClass = true;
    @HostListener('click', ['$event'])
    toggleExpand(event: Event) {
        // Find the clicked element from the event
        const target = event.target || event.srcElement || event.currentTarget;
        let header = $(target);

        // If we click on an element INSIDE the header, get a reference to the actual header first
        if (!header.hasClass('expandable-container__header')) {
            if (header.parents('.expandable-container__header').length === 0) {
                return;
            }

            header = header.closest('.expandable-container__header');
        }
        // Slide clicked panel up/down
        header.next('.expandable-container__content').slideToggle(400);

        // Add class to reflect new state, to enable shadows and margins
        header.closest('.expandable-container').toggleClass('expandable-container--collapsed expandable-container--expanded');

        // Slide all other panels up
        $('.expandable-container__content').not(header.next()).slideUp(400);

        // Add classes to other panels to reflect state
        $('.expandable-container__header').not(header).closest('.expandable-container').addClass('expandable-container--collapsed');
        $('.expandable-container__header').not(header).closest('.expandable-container').removeClass('expandable-container--expanded');
    }
}
