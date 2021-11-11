import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Guid } from '../../utils/guid';

@Component({
  selector: 'vgr-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss']
})
export class TabButtonComponent implements AfterViewInit, OnChanges {

  @Input() disabled = false;
  @Input() active = false;
  @Input() ariaLabel: string;
  @Input() tabId = Guid.newGuid();
  @Input() width = 'auto';

  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() home = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() end = new EventEmitter();
  @Output() selectedChanged = new EventEmitter<string>();

  @ViewChild('tabbutton', { static: true }) tabbutton: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;

  tabindex = 0;
  ariaPressed = false;
  initialTabId: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    Promise.resolve(null).then(() => {
        this.ariaPressed = this.active;
      });
  }

  ngAfterViewInit() {
    if (!this.ariaLabel) {
      Promise.resolve(null).then(() =>
        this.ariaLabel = `${this.content.nativeElement.innerText} tab button`
      );
    }

    Promise.resolve(null).then(() =>
      this.ariaPressed = this.active
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
    } else if (['Home'].includes(event.key)) {
      this.home.emit();
      event.preventDefault();
    } else if (['End'].includes(event.key)) {
      this.end.emit();
      event.preventDefault();
    }
  }

  public focus() {
    this.tabbutton.nativeElement.focus();
  }

  onChange(event: any) {
    if (this.disabled || this.active) {
      event.stopPropagation();
      return;
    }
    this.selectedChanged.emit(this.tabId);
  }
}
