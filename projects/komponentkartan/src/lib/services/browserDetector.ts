import { Injectable } from '@angular/core';

@Injectable()
export class BrowserDetector {

    constructor() {

    };

    isInternetExplorer(): boolean {
        const ua = window.navigator.userAgent;

        const msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return true;
        }

        const trident = ua.indexOf('Trident/');
        if (trident > 0) {
            return true;
        }

        // other browser
        return false;

    }
}
