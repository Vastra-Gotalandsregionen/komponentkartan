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
    { 'text': 'Avtal', 'state': false },
    { 'text': 'Valda', 'state': false }
  ];

  active = false;

  pages = [
    { 'text': 'Favoriter' },
    { 'text': 'Avtal' , 'active': 'true'},
    { 'text': 'Valda' }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate( ['/tab-start'],  { skipLocationChange: true });
    // console.log('hello from app')
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

  navigate(id) {
    switch(id) {
      case 'Favoriter':
        this.router.navigate( ['/favoriter'],  { skipLocationChange: true });
        break;
      case 'Valda':
        this.router.navigate( ['/valda'],  { skipLocationChange: true });
        break;
        case 'Avtal':
          this.router.navigate( ['/tab-start'],  { skipLocationChange: true });
          break;
      default:
        this.router.navigate(['/tab-button']);
        break;
    }
  }
}
