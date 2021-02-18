import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.css']
})
export class TabButtonComponent implements OnInit {

  state = false;
  states = [
    { 'text': 'Favoriter', 'state': true },
    { 'text': 'Avtal', 'state': false },
    { 'text': 'Valda', 'state': false }
  ];
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.state = !this.state;
  }

  toggleStates(state: any) {
    this.states.forEach(element => {
      element.state = false;
      if (element.text === state.text) {
        element.state = true;
      }
    });

  }
}
