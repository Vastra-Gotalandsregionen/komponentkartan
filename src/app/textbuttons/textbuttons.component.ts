import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonComponent } from '../../../projects/komponentkartan/src/lib';

@Component({
  selector: 'app-textbuttons',
  templateUrl: './textbuttons.component.html',
  styleUrls: ['./textbuttons.component.scss']
})
export class TextbuttonsComponent implements OnInit {
  @ViewChild('submitButton', { read: ButtonComponent, static: false }) submitButton: ButtonComponent;
  lastButtonPressed: string;
  buttonDisabled = true;
  buttonSecondaryDisabled = true;
  buttonDiscreetDisabled = true;
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.lastButtonPressed = '';
    this.form = fb.group({
      name: ['Namn']
    });
    this.form.disable();
  }

  ngOnInit() {
  }

  toggleFormActive() {
    if (this.form.enabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onSubmit() {
    alert('Form submitted!');
  }

  setFocusOnSubmit() {
    this.submitButton.focus();
  }
}
