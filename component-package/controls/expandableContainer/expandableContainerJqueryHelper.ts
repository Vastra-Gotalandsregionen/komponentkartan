import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ExpandableContainerJqeuryHelper {

    collapseContent(header: JQuery) {
        header.siblings('.expandable-container__content').slideUp(400);
    }

    showNotification(header: JQuery) {
        header.siblings('.expandable-container__notification-wrapper').show();
    }

    fadeInNotification(header: JQuery) {
        header.siblings('.expandable-container__notification-wrapper').fadeIn();
    }

    collapseNotification(header: JQuery, callback?: Function) {
        if (!callback) {
            header.siblings('.expandable-container__notification-wrapper').slideUp(400);
        } else {
            header.siblings('.expandable-container__notification-wrapper').slideUp(400, callback);
        }
    }

    collapseHeader(header: JQuery) {
        header.slideUp(400);
    }
    fadeOutNotification(header: JQuery) {
        header.siblings('.expandable-container__notification-wrapper').fadeOut(400);
    }

    toggleContent(elementRef: ElementRef) {
        const header = this.getHeader(elementRef);
        header.siblings('.expandable-container__content').slideToggle(400);
    }

    getHeader(elementRef: ElementRef): JQuery {
        return $(elementRef.nativeElement).children('.expandable-container__header');
    }

    isClickEventHeader(event: Event): boolean {
        const target = event.target || event.srcElement || event.currentTarget;
        const clickedElement = $(target);

        if (clickedElement.hasClass('expandable-container__header')) {
            return true;
        }
        if (clickedElement.hasClass('expandable-container__notification')) {
            return true;
        }
        if (clickedElement.parent('.expandable-container__header').length > 0) {
            return true;
        }
        if (clickedElement.parent('.expandable-container__notification').length > 0) {
            return true;
        }
        return false;
    }
}
