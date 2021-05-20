import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vgr-tab-start',
  templateUrl: './tab-start.component.html',
  styleUrls: ['./tab-start.component.css']
})
export class TabStartComponent implements OnInit {
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
    // router.navigate([{outlets: {primary: 'path' ,sidebar: 'path'}}]);
    switch(id) {
      case 'Favoriter':
        this.router.navigate( ['/favoriter'],  { skipLocationChange: true });
        // this.router.navigate(['/favoriter'])
        break;
      case 'Valda':
        this.router.navigate( ['/valda'],  { skipLocationChange: true });
        break;
        case 'Avtal':
          this.router.navigate( ['/tab-start'],  { skipLocationChange: true });
          break;
      default:
        console.log('lets go default')
        this.router.navigate(['/tab-button']);
        break;
    }
   // this.active = !this.active;
  }
}
