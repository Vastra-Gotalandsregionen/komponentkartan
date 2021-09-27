import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.css']
})
export class TabButtonComponent implements OnInit {
  pages = [
    { 'text': 'Favoriter' },
    { 'text': 'Avtal' , 'active': true},
    { 'text': 'Valda' }
  ];
  centrera = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate( ['/tab-start'],  { skipLocationChange: true });
    // console.log('hello from app')
  }

  navigate(id) {

    const page = this.pages.filter(tab => tab.text === id)[0];
    this.pages.forEach(element => {
      element.active = false;
      if (element.text === page.text) {
        element.active = true;
      }
    });

    switch (id) {
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
