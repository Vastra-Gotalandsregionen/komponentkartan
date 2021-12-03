import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'vgr-radiobutton-group',
  templateUrl: './radiobutton-group.component.html',
  styleUrls: ['./radiobutton-group.component.scss']
})
export class RadiobuttonGroupComponent {

  @Input() @HostBinding('class.disabled') disabled: boolean;
  @Input() @HostBinding('class.vertical') vertical = false;
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

}
