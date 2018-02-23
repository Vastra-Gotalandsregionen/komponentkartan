import { Component, AfterViewInit, ViewChild, HostBinding, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ModalService, IHeaderMenu, IHeaderMenuItem } from 'vgr-komponentkartan';

@Component({
    selector: 'app-komponentkartan',
    templateUrl: 'app.component.html'
})

export class KomponentkartanApplicationComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

    }

}


