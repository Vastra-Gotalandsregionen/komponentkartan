import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vgr-arvid',
  templateUrl: './arvid.component.html',
  styleUrls: ['./arvid.component.css']
})
export class ArvidComponent implements OnInit {

  preventCollapse = false;
  constructor() { }

  ngOnInit() {
  }

  togglePreventStatus() {
    this.preventCollapse = !this.preventCollapse;
  }

}
