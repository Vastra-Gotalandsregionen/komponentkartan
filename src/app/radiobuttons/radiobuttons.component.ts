import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationType, SelectableItem, RadioGroupComponent, RadiobuttonGroupComponent } from 'vgr-komponentkartan';
@Component({
  selector: 'app-radiobuttons',
  templateUrl: './radiobuttons.component.html',
  styleUrls: ['./radiobuttons.component.scss']
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

  constructor() { }

  ngOnInit() {
    this.options = [{ value: 'Val 1', displayName: 'Val 1' }, { value: 'Val 2', displayName: 'Val 2' }, { value: 'Val 3', displayName: 'Val 3' }];
    this.options2 = [{ value: 'Val 1', displayName: 'Val 1 med  väldigt lång label' }, { value: 'Val 2', displayName: 'Val 2' }, { value: 'Val 3', displayName: 'Val 3' }];

    this.radioGroupForm = new FormGroup({
      val: new FormControl()
    }, { updateOn: 'change' });

  }

  onSelectedRadioOptionChanged(option: string) {
    this.selectedOption = option;
  }

  someCode() {
    console.log('someCode')
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
