import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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

    this.userName = 'Göte Borg';
    this.systemText = `<localhost> vgr-komponentkartan version: ${this.komponentkartanVersion}, Angular: ${this.angularVersion} och Angular-Cli: ${this.angularCliVersion}`;
  }
}
