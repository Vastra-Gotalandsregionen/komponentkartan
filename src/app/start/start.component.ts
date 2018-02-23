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

  constructor() {
    const { dependencies: appVersion } = require('../../../package.json');
    this.currentVersion = appVersion['vgr-komponentkartan'];
    this.currentVersion = this.currentVersion.replace('^', '');

    const { version: angularVersion } = require('../../../node_modules/@angular/core/package.json');
    this.angularVersion = angularVersion;
  }

  ngOnInit() {
  }

}
