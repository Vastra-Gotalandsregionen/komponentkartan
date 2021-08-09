import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { CheckboxComponent as CheckboxComponentElement } from '../../../projects/komponentkartan/src/lib';
import { TableComponent as TableComponentElement } from '../../../projects/komponentkartan/src/lib';


@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @ViewChild('myCheckbox', { read: CheckboxComponentElement }) myCheckbox: CheckboxComponentElement;
  @ViewChild('myTable', { read: TableComponentElement }) myTable: TableComponentElement;

  constructor() { }

  ngOnInit() {
  }

  setFocus() {
    this.myCheckbox.focus();
  }
}