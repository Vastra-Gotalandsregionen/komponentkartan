import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ListItemJqeuryHelper {

    collapseContent(header: JQuery, callback?: any) {
        if (!callback) {
            header.siblings('.list-item__content').slideUp(400);
        } else {
            header.siblings('.list-item__content').slideUp(400, callback);
        }
    }

    toggleContent(elementRef: ElementRef) {
        const header = this.getHeader(elementRef);
        header.siblings('.list-item__content').slideToggle(400);
    }

    getHeader(elementRef: ElementRef): JQuery {
        return $(elementRef.nativeElement).children('.list-item__header');
    }

    isClickEventHeader(event: Event): boolean {
        const target = event.target || event.srcElement || event.currentTarget;
        const clickedElement = $(target);

        if (clickedElement.hasClass('list-item__header')) {
            return true;
        }
        if (clickedElement.hasClass('list-item__notification')) {
            return true;
        }
        if (clickedElement.parent('.list-item__header').length > 0) {
            return true;
        }
        if (clickedElement.parent('.list-item__notification').length > 0) {
            return true;
        }
        if (clickedElement.parent('.flex-column').length > 0) {
            return true;
        }
        return false;
    }
}
