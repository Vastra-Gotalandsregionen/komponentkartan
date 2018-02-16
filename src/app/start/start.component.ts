import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  currentVersion: string;

  constructor() {
    const { version: appVersion } = require('../../../package.json');

    this.currentVersion = appVersion;
    this.currentVersion = this.currentVersion.replace('^', '');
  }

  ngOnInit() {
  }
}
