import { Component, OnInit, HostListener, HostBinding, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { SelectablelistService } from './selectablelist.service';

@Component({
    selector: 'vgr-selectablelist-row',
    template: '<ng-content selects="vgr-selectablelist-column"></ng-content>',
    standalone: false
})
export class SelectablelistRowComponent implements OnInit {

  @Output() rowClicked = new EventEmitter();
  @Input() value: any;
  @HostBinding('class.groupheader')
  @Input() groupheader = false;

  @HostBinding('class.selectable')
  @Input() selectable = true;


  @HostBinding('class.selected')
  @HostBinding('attr.aria-selected') selected = false;
  @HostBinding('class.focused') focused = false;
  @HostBinding('attr.role') role = 'option';
  @HostBinding('attr.id') id: string;

  @HostListener('click') toggleSelected() {
    if (this.groupheader || !this.selectable) {
      this.selected = null;
    } else {
      this.selectablelistService.requestRowClicked(this);
    }
  }

  constructor(public elem: ElementRef, private selectablelistService: SelectablelistService) { }

  ngOnInit() {
    const parentid = this.elem.nativeElement.closest('vgr-selectablelist').id;
    const index = Array.from(this.elem.nativeElement.parentNode.children).indexOf(this.elem.nativeElement);
    this.id = `${parentid}-row${index}`;
    if (this.groupheader) {
      this.selected = null;
    } else if (!this.selectable) {
      this.selected = false;
    }
  }

}
