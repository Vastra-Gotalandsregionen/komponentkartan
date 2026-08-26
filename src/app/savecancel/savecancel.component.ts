import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-savecancel',
    templateUrl: './savecancel.component.html',
    styleUrls: ['./savecancel.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SavecancelComponent implements OnInit {

  saveCancelMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
