import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'vgr-radiobutton-item',
  templateUrl: './radiobutton-item.component.html',
  styleUrls: ['./radiobutton-item.component.scss']
})
export class RadiobuttonItemComponent implements AfterViewInit {

  @Input() selected: boolean;
  @Input() disabled: boolean;
  @Output() itemSelected = new EventEmitter();
  @Output() itemDisabled = new EventEmitter();

  @ViewChild('item') item: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    this.itemDisabled.emit();
    if (this.disabled && this.selected) {
      this.selected = false;
    }
  }

  itemClicked() {
    console.log(this.item)
    if (this.item && !this.disabled) {
      this.selected = true;
      this.itemSelected.emit();
      this.focus();
      return;
    }
  }

  public focus() {
    this.item.nativeElement.focus();
  }

  checkTabFocus() {
    console.log(this.item.nativeElement)
    return this.item;
  }
}
