import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.css']
})
export class TabButtonComponent implements OnInit {

  // active = false;
  state = false;
  states = [
    { 'text': 'Favoriter', 'state': false },
    { 'text': 'Avtal', 'state': true },
    { 'text': 'Valda', 'state': false }
  ];

  active = false;

  pages = [
    { 'text': 'Oversikt', 'active': false },
    { 'text': 'Exempel', 'active': true },
    { 'text': 'Api', 'active': false }
  ];
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.active = !this.active;
  }

  toggleStates(state: any) {
    this.states.forEach(element => {
      element.state = false;
      if (element.text === state.text) {
        element.state = true;
      }
    });

  }

  printLog(id) {
    console.log('skriver ut här: ', id);
    this.active = !this.active;
  }
}
