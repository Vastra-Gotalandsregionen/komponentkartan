import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-backtotop',
    templateUrl: './backtotop.component.html',
    styleUrls: ['./backtotop.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BacktotopComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
