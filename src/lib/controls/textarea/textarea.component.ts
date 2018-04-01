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

  @HostBinding('class.textarea-validation-error--active') get errorClass() {
    return true;
  }
  @HostBinding('class.textarea-validation-error--editing') get editingClass() {
    return false;
  }
  @HostBinding('class.textarea-validation-error--fixed') get fixedClass() {
    return false;
  }

  textareaDimension: any;

  constructor() {
    this.width = '100%';
    this.height = '120px';
    this.placeholder = '';
  }

  ngOnInit() {
    this.textareaDimension = {
      'width': this.width,
      'height': this.height
    };
  }

}
