import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ActionPanelJqeuryHelper {
    private defaultDuration = 600;

    collapseContent(elementRef: ElementRef, callback?: any, duration?: number) {
        if (!callback) {
            $(elementRef.nativeElement).slideUp(duration ? duration : this.defaultDuration);
        } else {
            $(elementRef.nativeElement).slideUp(duration ? duration : this.defaultDuration, callback);
        }
    }


    toggleContent(elementRef: ElementRef, duration?: number, ) {
        $(elementRef.nativeElement).slideToggle(duration ? duration : this.defaultDuration, () => { $(elementRef.nativeElement).css('display', 'block') });
    }

}
