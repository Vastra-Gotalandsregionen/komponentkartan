import { Component, OnInit, Input } from '@angular/core';
import { NotificationType, SelectableItem } from '@komponentkartan/index';
@Component({
  selector: 'app-radiobuttons',
  templateUrl: './radiobuttons.component.html',
  styleUrls: ['./radiobuttons.component.scss']
})
export class RadiobuttonsComponent implements OnInit {
  selectedOption: string;
  notificationTypes = NotificationType;

  options: Array<SelectableItem<any>> = [];
  constructor() { }

  ngOnInit() {
    this.options = [{ value: 'Val 1', displayName: 'Val 1' }, { value: 'Val 2', displayName: 'Val 2' }, { value: 'Val 3', displayName: 'Val 3' }];
  }

  onSelectedRadioOptionChanged(option: string) {
    this.selectedOption = option;
  }

  rensaVal() {
    this.options.forEach(o => o.selected = false);
  }

}
