import { Injectable } from '@angular/core';

@Injectable()
export class BrowserDetector {

    constructor() {

    };

    isInternetExplorer(): boolean {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return true;
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            return true;
        }

        // other browser
        return false;

    }
}