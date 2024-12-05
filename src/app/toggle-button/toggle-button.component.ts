import { Component, OnInit, ViewChild } from '@angular/core';
import { ToggleButtonGroupComponent, ToggleButtonComponent as ToggleButtonComponentElement } from '../../../projects/komponentkartan/src/lib';

@Component({
    selector: 'app-toggle-button',
    templateUrl: './toggle-button.component.html',
    styleUrls: ['./toggle-button.component.css'],
    standalone: false
})
export class ToggleButtonComponent implements OnInit {
  @ViewChild('myToggleButtonGroup', { read: ToggleButtonGroupComponent }) myToggleButtonGroup: ToggleButtonGroupComponent;
  @ViewChild('myToggleButton', { read: ToggleButtonComponentElement }) myToggleButton: ToggleButtonComponentElement;
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

  setFocusOnMyToggleButton() {
    setTimeout(() => {
      this.myToggleButton.focus();
    });
  }

  setFocusOnMyToggleButtonGroup() {
    setTimeout(() => {
      this.myToggleButtonGroup.focus();
    });
  }

}
