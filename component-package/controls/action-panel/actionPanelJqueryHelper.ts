import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ActionPanelJqeuryHelper {

    collapseContent(elementRef: ElementRef, callback?: Function) {
        if (!callback) {
            $(elementRef.nativeElement).slideUp(400);
        } else {
            $(elementRef.nativeElement).slideUp(400, callback);
        }
    }

    toggleContent(elementRef: ElementRef) {
        $(elementRef.nativeElement).slideToggle(400, () => { $(elementRef.nativeElement).css('display', 'block') });
    }

}
