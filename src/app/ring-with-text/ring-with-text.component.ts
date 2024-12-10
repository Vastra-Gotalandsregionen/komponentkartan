import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ring-with-text',
    templateUrl: './ring-with-text.component.html',
    styleUrls: ['./ring-with-text.component.css'],
    standalone: false
})
export class RingWithTextComponent implements OnInit {

  vartext = 'NE';

  constructor() { }

  ngOnInit() {
  }

}
