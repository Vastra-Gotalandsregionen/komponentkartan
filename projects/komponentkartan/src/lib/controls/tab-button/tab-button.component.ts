import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Guid } from '../../utils/guid';

@Component({
  selector: 'vgr-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss']
})
export class TabButtonComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() disabled = false;
  @Input() active = false;
  @Input() ariaLabel: string;
  @Input() tabId = Guid.newGuid();
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() home = new EventEmitter();
  @Output() end = new EventEmitter();
  @Output() selectedChanged = new EventEmitter<string>();
  @Output() id: any;
  @ViewChild('tabbutton', { static: true }) tabbutton: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;

  tabindex = 0;
  ariaPressed: boolean;
  initialTabId: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {

    // const parent = this.elementRef.nativeElement.closest('vgr-tab-button-group');
    // let parentId;

    // if (parent && parent.attributes){
    //   console.log('id: ', parent.getAttribute('id'))
    //   if (parent.getAttribute('id')) {
    //     parentId = parent.attributes['id'].value;
    //     console.log('parentId: ', parentId)
    //   } else {
    //     console.log('3')
    //     parentId =  Guid.newGuid();
    //   }
    // } else {
    //   console.log('2')
    //   parentId =  Guid.newGuid();
    // }
    // const index = Array.from(this.elementRef.nativeElement.parentNode.children).indexOf(this.elementRef.nativeElement);
    // this.id = `${parentId}-tab${index}`;
    // if (!this.tabId) {
    //   this.tabId = Guid.newGuid();
    //   console.log(this.id)
    // }
  }
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

  // ngAfterContentInit() {
  //   this.tabId = this.elementRef.nativeElement.innerText;
  // }

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

  focus() {
    this.tabbutton.nativeElement.focus();
  }

  onChange(event: any) {
    if (this.disabled || this.active) {
      event.stopPropagation();
      return;
    }
    console.log('selectedChanged, emit: ', this.tabId)

    this.selectedChanged.emit(this.tabId)
  }
}
