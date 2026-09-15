import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-tab-button-favoriter',
    templateUrl: './favoriter.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FavoriterComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
