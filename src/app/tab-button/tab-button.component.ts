import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    { 'text': 'Favoriter', 'active': false },
    { 'text': 'Avtal', 'active': true },
    { 'text': 'Valda', 'active': false }
  ];
  constructor(private router: Router) { }

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
    console.log('skriver ut här: ', id, this.states);
    switch(id) {
      case 'Favoriter':
        this.router.navigate(['/favoriter']);
        break;
      case 'Valda':
        this.router.navigate(['/valda']);
        break;
      default:
        this.router.navigate(['/tab-button']);
        break;
    }
    this.active = !this.active;
  }
}
