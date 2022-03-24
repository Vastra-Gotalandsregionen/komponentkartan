import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'vgr-radiobutton-item',
  templateUrl: './radiobutton-item.component.html',
  styleUrls: ['./radiobutton-item.component.scss']
})
export class RadiobuttonItemComponent implements AfterViewInit {
  groupDisabledOverride: boolean; // gruppens disabledState
  elementId: string;


  @Input() selected: boolean;
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

  @Output() itemSelected = new EventEmitter();
  @Output() itemDisabled = new EventEmitter();

  @ViewChild('item') item: ElementRef;
  @ViewChild('radioButton') radioButton: ElementRef;
  @ContentChild('radioButtonContent') radioButtonContent: ElementRef;


  _disabled: boolean;
  isTabEnabled: boolean;

  constructor(private elementRef: ElementRef) {
    this.elementId = Math.random().toString();

    
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
