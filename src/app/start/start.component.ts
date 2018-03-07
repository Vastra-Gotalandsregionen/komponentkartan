import { Component, OnInit } from '@angular/core';
declare var require: any;


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  currentVersion: string;
  angularVersion: string;
  angularCliVersion: string;

  constructor() {
  }

  ngOnInit() {
    const { version: appVersion } = require('../../../package.json');
    this.currentVersion = appVersion;
    this.currentVersion = this.currentVersion ? this.currentVersion.replace('^', '') : this.currentVersion;

    const { version: angularVersion } = require('../../../node_modules/@angular/core/package.json');
    this.angularVersion = angularVersion;

    const { dependencies: cliVersion } = require('../../../package.json');
    this.angularCliVersion = cliVersion['@angular/cli'];
    this.angularCliVersion = this.angularCliVersion ? this.angularCliVersion.replace('^', '') : this.angularCliVersion;
  }

}
