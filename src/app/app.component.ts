import { Component, AfterViewInit, ViewChild, HostBinding } from '@angular/core';
import { ModalService, IHeaderMenu, IHeaderMenuItem } from '@komponentkartan/index';
declare var require: any;

@Component({
    selector: 'app-komponentkartan',
    templateUrl: 'app.component.html'
})

export class KomponentkartanApplicationComponent {
    currentVersion: string;
    angularVersion: string;

    constructor() {
        const { version: appVersion } = require('../../package.json');

        this.currentVersion = appVersion;
        this.currentVersion = this.currentVersion.replace('^', '');

        const { version: angularVersion } = require('../../node_modules/@angular/core/package.json');
        this.angularVersion = angularVersion;
    }

}


