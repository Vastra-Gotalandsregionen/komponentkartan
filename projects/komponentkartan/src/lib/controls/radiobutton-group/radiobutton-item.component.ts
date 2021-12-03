import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'vgr-radiobutton-item',
  templateUrl: './radiobutton-item.component.html',
  styleUrls: ['./radiobutton-item.component.scss']
})
export class RadiobuttonItemComponent {

  @Input() selected: boolean;
  @Input() @HostBinding('class.disabled') disabled: boolean;
  constructor() { }

}
