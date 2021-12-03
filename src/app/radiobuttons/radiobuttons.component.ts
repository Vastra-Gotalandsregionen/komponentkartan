import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationType, SelectableItem, RadioGroupComponent } from 'vgr-komponentkartan';
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
  @ViewChild('myRadioGroup', { read: RadioGroupComponent, static: false }) myRadioGroup: RadioGroupComponent;

  constructor() { }

  ngOnInit() {
    this.options = [{ value: 'Val 1', displayName: 'Val 1' }, { value: 'Val 2', displayName: 'Val 2' }, { value: 'Val 3', displayName: 'Val 3' }];
    this.options2 = [{ value: 'Val 1', displayName: 'Val 1 med  väldigt lång label' }, { value: 'Val 2', displayName: 'Val 2' }, { value: 'Val 3', displayName: 'Val 3' }];

  }

  onSelectedRadioOptionChanged(option: string) {
    this.selectedOption = option;
  }

  someCode() {
    console.log('someCode')
  }

  rensaVal() {
    this.options.forEach(o => o.selected = false);
  }

  setFocus() {
    if (this.myRadioGroup) {
      setTimeout(() => {
        this.myRadioGroup.focus();
      });
    }
  }

}
