import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'vgr-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss']
})
export class TabButtonComponent implements AfterViewInit, AfterContentInit, OnChanges {

  @Input() disabled = false;
  @Input() active = false;
  @Input() ariaLabel: string;
  @Input() tabId: string;
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() selectedChanged = new EventEmitter<string>();
  @ViewChild('tabbutton', { static: true }) tabbutton: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;

  tabindex = 0;
  ariaPressed: boolean;
  initialTabId: string;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges() {
    Promise.resolve(null).then(() =>
      this.ariaPressed = this.active
      );
  }

  ngAfterViewInit() {
    if (!this.ariaLabel) {
      Promise.resolve(null).then(() =>
        this.ariaLabel = `${this.content.nativeElement.innerHTML} tab button`
      );
    }

    Promise.resolve(null).then(() =>
      this.ariaPressed = this.active
    );
  }

  ngAfterContentInit() {
    this.tabId = this.elementRef.nativeElement.innerText;
    // console.log(this.elementRef)
    console.log('tabid ', this.tabId)
  }

  makeTabFocusable(focusable: boolean) {
    Promise.resolve(null).then(() =>
      this.tabindex = focusable ? 0 : -1
    );
  }

  onKeydown(event: KeyboardEvent) {
    if (['ArrowLeft', 'Left', 'ArrowUp', 'Up'].includes(event.key)) {
      this.previous.emit();
      event.preventDefault();
    } else if (['ArrowRight', 'Right', 'ArrowDown', 'Down'].includes(event.key)) {
      this.next.emit();
      event.preventDefault();
    } else if (['Enter', 'Spacebar', ' '].includes(event.key)) {
      event.stopPropagation();
    }
  }

  focus() {
    this.tabbutton.nativeElement.focus();
  }

  onChange(event: any) {
    console.log('onChange: ', event)
    if (this.disabled || this.active) {
      event.stopPropagation();
      return;
    }

    this.selectedChanged.emit(this.tabId)
  }
}
