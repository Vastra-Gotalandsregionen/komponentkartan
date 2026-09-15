import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-formattemplate',
    templateUrl: './formattemplate.component.html',
    styleUrls: ['./formattemplate.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FormattemplateComponent implements OnInit {

  showAlert = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.showAlert = true;
    }, 3000);
  }



}
