import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-colours',
    templateUrl: './colours.component.html',
    styleUrls: ['./colours.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ColoursComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
