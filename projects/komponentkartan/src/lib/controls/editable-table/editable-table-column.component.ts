import { Component, Input, HostBinding, ElementRef, Host } from '@angular/core';



@Component({
    selector: 'vgr-editable-table-column',
    template: '<ng-content></ng-content>',
    standalone: false
})
export class EditableTableColumnComponent {


  @HostBinding('style.textAlign') align = 'left';
  @HostBinding('tabIndex') tabIndex = -1;
  @HostBinding('class.editmode') editMode;

  @Input() @HostBinding('attr.aria-describedby') headerId = '';
  @HostBinding('attr.role') role = 'cell';

  constructor(private el: ElementRef) {

  }

  focus() {
    this.el.nativeElement.focus();
  }

}
