import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Guid } from '../../utils/guid';

@Component({
    selector: 'vgr-radiobutton-item',
    templateUrl: './radiobutton-item.component.html',
    styleUrls: ['./radiobutton-item.component.scss'],
    standalone: false
})
export class RadiobuttonItemComponent implements AfterViewInit {
  groupDisabledOverride: boolean; // gruppens disabledState
  elementId: string;


  @Input() set selected(val: boolean) {
    this._selected = val;
    if (this._selected) {
      this.tabIndex = 0;
    }
  };
  @Input() value: string | number;
  label: string;
  @Input() set disabled(val: boolean) {
    this._disabled = val;
  };
  get disabled() {
    if (this.groupDisabledOverride) {
      return true;
    } else {
      return this._disabled;
    }
  }

  get selected() : boolean {
    return this._selected;
  }

  @Output() itemSelected = new EventEmitter();
  @Output() itemDisabled = new EventEmitter();

  @ViewChild('item') item: ElementRef;
  @ViewChild('radioButton') radioButton: ElementRef;
  @ContentChild('radioButtonContent') radioButtonContent: ElementRef;

  tabIndex: number = -1;
  _disabled: boolean;
  _selected: boolean = false;

  set tabEnabled(val: boolean) {
    this.isTabEnabled = val;
    if (this.isTabEnabled) {
      setTimeout(() => {
        this.tabIndex = 0
      });
    }
  }

  isTabEnabled: boolean = false;

  constructor(private elementRef: ElementRef) {
    this.elementId = Guid.newGuid();
  }

  ngAfterViewInit() {
    this.label = (this.item.nativeElement as Node).textContent.trim();
    if (this.value === undefined) {
      this.value = this.label;
    }
  }

  itemClicked() {
    if (this.item && !this.disabled) {
      this.selected = true;
      // this.tabIndex = 0;
      this.itemSelected.emit();
    }
    this.focus();
  }

  public firstfocusIn() {
    if (this.isTabEnabled) {
      this.isTabEnabled = false;
      this.focus();
    }
  }

  public focus() {
    if(!this.disabled && !this.selected) {
      this.selected = true;
      // this.tabIndex = 0;
      this.itemSelected.emit();
    }

    this.radioButton.nativeElement.focus();
  }

  public hasFocus() {
    return this.radioButton.nativeElement === document.activeElement;
  }
  checkTabFocus() {
    return this.elementRef.nativeElement.querySelectorAll('.radio-button--checked').length > 0;
  }
}
