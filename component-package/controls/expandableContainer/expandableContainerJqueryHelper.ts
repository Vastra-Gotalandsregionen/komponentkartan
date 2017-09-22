import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ExpandableContainerJqeuryHelper {

    collapseContent(header: JQuery, callback?: Function) {
        if (!callback) {
            header.siblings('.expandable-container__content').slideUp(400);
        } else {
            header.siblings('.expandable-container__content').slideUp(400, callback);
        }
    }

    collapseContentSlow(header: JQuery, callback?: Function) {
        if (!callback) {
            header.siblings('.expandable-container__content').slideUp(1000);
        } else {
            header.siblings('.expandable-container__content').slideUp(1000, callback);
        }
    }

    showNotification(header: JQuery) {
        header.siblings('.expandable-container__notification-wrapper').show();
    }

    fadeInNotification(header: JQuery, callback?: Function) {
        if (!callback) {
            header.siblings('.expandable-container__notification-wrapper').fadeIn();
        } else {
            header.siblings('.expandable-container__notification-wrapper').fadeIn(400, callback);
        }
    }
    slideDownNotification(header: JQuery, callback?: Function) {
        if (!callback) {
            header.siblings('.expandable-container__notification-wrapper').slideDown(400);
        } else {
            header.siblings('.expandable-container__notification-wrapper').slideDown(400, callback);
        }
    }

    collapseNotification(header: JQuery, callback?: Function) {
        if (!callback) {
            header.siblings('.expandable-container__notification-wrapper').slideUp(400);
        } else {
            header.siblings('.expandable-container__notification-wrapper').slideUp(400, callback);
        }
    }

    collapseHeader(elementRef: ElementRef, callback?: Function) {
        if (!callback) {
            $(elementRef.nativeElement).children('.expandable-container__header,.expandable-container__notification-wrapper').slideUp(400);
        } else {
            $(elementRef.nativeElement).children('.expandable-container__header,.expandable-container__notification-wrapper').slideUp(400, callback);
        }
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
