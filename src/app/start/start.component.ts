import { Component, OnInit } from '@angular/core';
declare var require: any;


@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss'],
    standalone: false
})
export class StartComponent implements OnInit {
  currentVersion: string;
  angularVersion: string;
  angularCliVersion: string;

  constructor() {
    const { version: appVersion } = require('../../../projects/komponentkartan/package.json');
    this.currentVersion = appVersion;

    const { version: angularVersion } = require('../../../node_modules/@angular/core/package.json');
    this.angularVersion = angularVersion;

    const { devDependencies: cliVersion } = require('../../../package.json');
    this.angularCliVersion = cliVersion['@angular/cli'];
    this.angularCliVersion = this.angularCliVersion ? this.angularCliVersion.replace('^', '') : this.angularCliVersion;
  }

  ngOnInit() {
  }

}
