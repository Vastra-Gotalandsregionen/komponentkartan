import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent implements OnInit {
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
