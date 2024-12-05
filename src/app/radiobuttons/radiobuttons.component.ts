import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationType, SelectableItem, RadioGroupComponent, RadiobuttonGroupComponent } from '../../../projects/komponentkartan/src/lib';
@Component({
    selector: 'app-radiobuttons',
    templateUrl: './radiobuttons.component.html',
    styleUrls: ['./radiobuttons.component.scss'],
    standalone: false
})
export class RadiobuttonsComponent implements OnInit {
  selectedOption: string;
  notificationTypes = NotificationType;

  options: Array<SelectableItem<any>> = [];
  options2: Array<SelectableItem<any>> = [];

  radiogroupVal: string;
  radioGroupForm: FormGroup;

  groupDisabled: boolean = true;
  @ViewChild('myRadioGroup', { read: RadioGroupComponent, static: false }) myRadioGroup: RadioGroupComponent;
  @ViewChild('RadioGroup2') radioGroup2: RadiobuttonGroupComponent;

  valdBil: string;
  constructor() { }

  ngOnInit() {
    this.options = [{ value: 'Val 1', displayName: 'Val 1' }, { value: 'Val 2', displayName: 'Val 2' }, { value: 'Val 3', displayName: 'Val 3' }];
    this.options2 = [{ value: 'Val 1', displayName: 'Val 1 med  väldigt lång label' }, { value: 'Val 2', displayName: 'Val 2' }, { value: 'Val 3', displayName: 'Val 3' }];

    this.radioGroupForm = new FormGroup({
      val: new FormControl('Det var inte bra')
    }, { updateOn: 'change' });

    this.selectedOption = 'Toyota';

  }


  valjBil(param) {
    this.selectedOption = param.value;
    if (this.groupDisabled) {
      this.valdBil = 'Du har valt att cykla'
    } else {
      this.valdBil = this.selectedOption;
    }

  }

  someCode(param) {
    console.log('Du har valt ', param.value)
  }

  rensaVal() {
    this.options.forEach(o => o.selected = false);
    this.radioGroup2.unSelectItems();

  }

  setFocus() {
    if (this.myRadioGroup) {
      setTimeout(() => {
        this.myRadioGroup.focus();
      });
    }
  }

}
