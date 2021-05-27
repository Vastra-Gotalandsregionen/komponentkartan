import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vgr-tab-start',
  templateUrl: './tab-start.component.html',
  styleUrls: ['./tab-start.component.css']
})
export class TabStartComponent implements OnInit {
  // active = false;
  active = true;

  pages = [
    { 'text': 'Favoriter', 'active': false },
    { 'text': 'Avtal', 'active': true },
    { 'text': 'Valda', 'active': false }
  ];
  activeTab: any = 'inget än';
  constructor(private router: Router) { }

  ngOnInit() {
  }


  printLog(id) {
    this.activeTab = id;
    this.active = !this.active;
  }
}
