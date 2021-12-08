import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'vgr-radiobutton-item',
  templateUrl: './radiobutton-item.component.html',
  styleUrls: ['./radiobutton-item.component.scss']
})
export class RadiobuttonItemComponent implements AfterViewInit, AfterContentInit, OnChanges {
  groupDisabledOverride: boolean; // gruppens disabledState
  elementId: string;


  @Input() selected: boolean;
  @Input() set disabled(val: boolean) {
    console.log('set _disabled: ', val)
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
  @ViewChild('radioButtonContent') radioButtonContent: ElementRef;


  _disabled: boolean;
  isTabEnabled: boolean;

  constructor(private elementRef: ElementRef) {
    this.elementId = Math.random().toString();

  }

  ngAfterViewInit() {
    // this.itemDisabled.emit();
    // if (this.disabled && this.selected) {
    //   this.selected = false;
    // }
    console.log('afterviewInit: ', this.groupDisabledOverride)
  }

  ngAfterContentInit() {
    setTimeout(() => {
      console.log('radioContent: ', this.radioButtonContent)
    }, 1000);

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes: ', changes)
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

  checkTabFocus() {
    return this.elementRef.nativeElement.querySelectorAll('.radio-button--checked').length > 0;

  }
}
