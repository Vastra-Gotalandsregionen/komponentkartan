import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-closebutton',
    templateUrl: './closebutton.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ClosebuttonComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
