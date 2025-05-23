import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'vgr-combobox-item',
    templateUrl: './combobox-item.component.html',
    standalone: false
})
export class ComboboxItemComponent implements AfterViewInit {

  @Input() selectedLabel: string;
  @Input() value: any;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select = new EventEmitter();
  @ViewChild('item') item: ElementRef;
  label: string;
  index: number;
  selected = false;
  highlighted = false;
  visible = true;
  hasFocus = false;

  ngAfterViewInit() {
    this.label = (this.item.nativeElement as Node).textContent.trim();
    if (this.value === undefined) {
      this.value = this.label;
    }
  }

  setSelected() {
    this.selected = true;
    this.select.emit();
  }

  public setIndex(index: number) {
    this.index = index;
  }

}
