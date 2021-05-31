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
  active2 = true;

  pages = [
    { 'text': 'Favoriter', 'active': false },
    { 'text': 'Avtal', 'active': true },
    { 'text': 'Valda', 'active': false }
  ];
  activeTab: any = 'inget än';
  activeTab2: any = 'inget än';
  tabPressed: string;
  panelColor: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }


  printLog(id) {
    this.activeTab = id;
    this.active = !this.active;
  }

  setActiveTab2(id) {
    this.activeTab2 = id;
    this.active2 = !this.active2;
  }

  setActivePanelText(text: string) {
    this.tabPressed = text;
    if (this.tabPressed.includes('mitten')) {
      this.panelColor = 'green'
    } else if (this.tabPressed.includes('höger')) {
      this.panelColor = 'blue'
    } else {
      this.panelColor = 'red'
    }
  }
}
