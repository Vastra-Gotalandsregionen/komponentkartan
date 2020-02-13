import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-textareafield',
  templateUrl: './textareafield.component.html',
  styleUrls: ['./textareafield.component.css']
})
export class TextareafieldComponent implements OnInit {
  isReadonly = true;
  form: FormGroup;
  initValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in feugiat lorem. Phasellus vel lacus ac dui eleifend condimentum. Nunc et mi in leo vehicula fringilla. Pellentesque luctus tortor nec pharetra condimentum. Aliquam varius iaculis neque, sit amet sollicitudin neque porttitor quis. Phasellus eu placerat felis, sed condimentum lectus. Morbi id interdum mauris, ac gravida lorem.';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      control1: [''],
      control2: ['', Validators.required],
    });
  }
}
