import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { CheckboxComponent as CheckboxComponentElement } from '../../../projects/komponentkartan/src/lib';


@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @ViewChild('myCheckbox', { read: CheckboxComponentElement }) myCheckbox: CheckboxComponentElement;

  constructor() { }

  ngOnInit() {
  }

  setFocus() {
    this.myCheckbox.focus();
  }
}