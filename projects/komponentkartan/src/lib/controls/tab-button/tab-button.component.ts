import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'vgr-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss']
})
export class TabButtonComponent implements AfterViewInit, OnChanges {

  @Input() disabled = false;
  @Input() pressed = false;
  @Input() ariaLabel: string;
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @ViewChild('tabbutton', { static: true }) tabbutton: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;

  tabindex = 0;
  ariaPressed: boolean;

  ngOnChanges() {
    Promise.resolve(null).then(() =>
      this.ariaPressed = this.pressed
    );
  }

  ngAfterViewInit() {
    if (!this.ariaLabel) {
      Promise.resolve(null).then(() =>
        this.ariaLabel = `${this.content.nativeElement.innerHTML} tab button`
      );
    }

    Promise.resolve(null).then(() =>
      this.ariaPressed = this.pressed
    );
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

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
