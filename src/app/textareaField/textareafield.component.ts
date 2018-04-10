import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-textareafield',
  templateUrl: './textareafield.component.html',
  styleUrls: ['./textareafield.component.css']
})
export class TextareafieldComponent implements OnInit {
  isReadonly: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      control1: [''],
      control2: ['', Validators.required],
    });
  }
}
