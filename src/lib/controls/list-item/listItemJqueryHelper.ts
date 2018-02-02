import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ListItemJqeuryHelper {

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
