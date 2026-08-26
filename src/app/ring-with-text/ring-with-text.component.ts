import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-ring-with-text',
    templateUrl: './ring-with-text.component.html',
    styleUrls: ['./ring-with-text.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RingWithTextComponent implements OnInit {

  vartext = 'NE';

  constructor() { }

  ngOnInit() {
  }

}
