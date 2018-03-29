import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'vgr-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {

  @Input() width: string;
  @Input() height: string;
  @Input() placeholder: string;

  @HostBinding('class.validated-input') hasClass = true;
  @HostBinding('class.validation-error--active') get errorClass() {
    return true;
  }
  @HostBinding('class.validation-error--editing') get editingClass() {
    return false;
  }
  @HostBinding('class.validation-error--fixed') get fixedClass() {
    return false;
  }

  currentStyles: any;

  constructor() {
    this.width = '100%';
    this.height = '120px';
    this.placeholder = '';
  }

  ngOnInit() {
    this.currentStyles = {
      'width': this.width,
      'height': this.height
    };
  }

}
