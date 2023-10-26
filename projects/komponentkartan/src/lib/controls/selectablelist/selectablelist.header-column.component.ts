import { Component, OnInit, HostBinding, Input, HostListener, ElementRef } from '@angular/core';
import { Guid } from '../../utils/guid';
import { SelectablelistService } from './selectablelist.service';
@Component({
  selector: 'vgr-selectablelist-header-column',
  template: '<ng-content></ng-content>'
})
export class SelectablelistHeaderColumnComponent implements OnInit {

  @HostBinding('class.right') @Input() alignRight = false;
  @HostBinding('class.center') @Input() alignCenter = false;
  id: string;
  @HostListener('click') toggleSelected() {
    this.selectablelistService.headerClicked(this);
  }
  constructor(public elem: ElementRef, private selectablelistService: SelectablelistService) {}

  ngOnInit() {
    const uniqeId = Guid.newGuid();
    const index = Array.from(this.elem.nativeElement.parentNode.children).indexOf(this.elem.nativeElement);
    this.id = `${uniqeId}-header-${index}`;
  }


}
