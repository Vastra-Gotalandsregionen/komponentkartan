import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-lockbutton',
    templateUrl: './lockbutton.component.html',
    styleUrls: ['./lockbutton.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LockbuttonComponent implements OnInit {
  lockMessage: string;
  constructor() { }

  ngOnInit() {
  }

}
