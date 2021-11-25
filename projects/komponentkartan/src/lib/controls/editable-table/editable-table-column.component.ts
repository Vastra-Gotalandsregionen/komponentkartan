import { Component, Input, HostBinding, ElementRef } from '@angular/core';



@Component({
  selector: 'vgr-editable-table-column',
  template: '<ng-content></ng-content>'
})
export class EditableTableColumnComponent {


  @HostBinding('style.textAlign') align = 'left';
  @HostBinding('tabIndex') tabIndex = -1;
  @HostBinding('class.editmode') editMode = false;
  @Input() @HostBinding('attr.aria-describedby') headerId = '';
  @HostBinding('attr.role') role = 'cell';

  constructor(private el: ElementRef) {

  }

  focus() {
    this.el.nativeElement.focus();
  }

}
