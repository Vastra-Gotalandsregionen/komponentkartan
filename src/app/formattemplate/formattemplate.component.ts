import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formattemplate',
  templateUrl: './formattemplate.component.html',
  styleUrls: ['./formattemplate.component.scss']
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
