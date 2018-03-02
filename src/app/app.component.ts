import { Component, AfterViewInit, ViewChild, HostBinding, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ModalService, IHeaderMenu, IHeaderMenuItem } from 'vgr-komponentkartan';
declare var require: any;

@Component({
    selector: 'app-komponentkartan',
    templateUrl: 'app.component.html'
})

export class KomponentkartanApplicationComponent implements OnInit {
    currentVersion: string;

    constructor(private router: Router) {
    }

    ngOnInit() {
        const { version: appVersion } = require('../../package.json');
        this.currentVersion = appVersion;
        this.currentVersion = this.currentVersion ? this.currentVersion.replace('^', '') : this.currentVersion;

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

    }

}


