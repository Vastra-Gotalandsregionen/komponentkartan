import { Component, OnInit, HostBinding, Input, ElementRef } from '@angular/core';
import { Guid } from '../../utils/guid';
@Component({
  selector: 'vgr-editable-table-header-column',
  template: '<ng-content></ng-content>'
})
export class EditableTableHeaderColumnComponent implements OnInit {

  @HostBinding('style.textAlign') @Input() align = 'left';
  @HostBinding('style.width') @Input() width;
  @HostBinding('attr.id') id: string;
  @HostBinding('attr.role') role = 'columnheader';
  parentId: string;


  constructor(public elem: ElementRef) {}

  ngOnInit() {
    const uniqeId = Guid.newGuid();
    const index = Array.from(this.elem.nativeElement.parentNode.children).indexOf(this.elem.nativeElement);
    this.id = `${uniqeId}-header-${index}`;

    //check that align value is correct
    if (this.align !== 'left' && this.align !== 'center' && this.align !== 'right') {
      throw new Error('Felaktigt värde på align, endast left, right eller center kan anges ( du har satt ' + this.align + ' ) på kolumn '+ index );
    }
  }


}
