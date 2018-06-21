import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
declare var require: any;

@Component({
    selector: 'app-komponentkartan',
    templateUrl: 'app.component.html'
})

export class KomponentkartanApplicationComponent implements OnInit {
    komponentkartanVersion: string;
    angularVersion: string;
    angularCliVersion: string;

    userName: string;
    systemText: string;

    constructor(private router: Router) {
        const { version: appVersion } = require('../../projects/komponentkartan/package.json');
        this.komponentkartanVersion = appVersion;

        const { version: angularVersion } = require('../../node_modules/@angular/core/package.json');
        this.angularVersion = angularVersion;

        const { devDependencies: cliVersion } = require('../../package.json');
        this.angularCliVersion = cliVersion['@angular/cli'];
        this.angularCliVersion = this.angularCliVersion ? this.angularCliVersion.replace('^', '') : this.angularCliVersion;
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

        Observable.of('Göte Borg').delay(1000).subscribe(x => { this.userName = x; });

        this.systemText = `ENV: <localhost> VERSION: (komponentkartan: ${this.komponentkartanVersion}/angular: ${this.angularVersion}/angular-cli: ${this.angularCliVersion})`;

    }

}


