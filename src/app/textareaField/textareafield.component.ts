import { Component, OnInit, ViewChild} from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TextareaComponent } from '../../../projects/komponentkartan/src/lib';


@Component({
  selector: 'app-textareafield',
  templateUrl: './textareafield.component.html',
  styleUrls: ['./textareafield.component.css']
})
export class TextareafieldComponent implements OnInit {
  @ViewChild('myTextarea', { read: TextareaComponent }) myTextarea: TextareaComponent;
  isReadonly = false;
  disabled = false;
  form: UntypedFormGroup;
  initValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in feugiat lorem. Phasellus vel lacus ac dui eleifend condimentum. Nunc et mi in leo vehicula fringilla. Pellentesque luctus tortor nec pharetra condimentum. Aliquam varius iaculis neque, sit amet sollicitudin neque porttitor quis. Phasellus eu placerat felis, sed condimentum lectus. Morbi id interdum mauris, ac gravida lorem.';

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      control1: [''],
      control2: ['', Validators.required],
    });
  }

  setFocus() {
    this.myTextarea.focus();
  }

  toggleDisabled(value) {
    this.disabled = !this.disabled;
  }
}
