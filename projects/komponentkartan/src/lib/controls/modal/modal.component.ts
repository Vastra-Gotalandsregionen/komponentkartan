import {
  Component, AfterViewChecked, QueryList, forwardRef, ElementRef, ContentChildren, Renderer2, OnDestroy, Output, EventEmitter
} from '@angular/core';
import { ModalService } from '../../services/modalService';
import { ButtonComponent } from '../button/button.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalPlaceholderComponent implements AfterViewChecked, OnDestroy {
  @Output() outsideClick = new EventEmitter();

  isOpen: boolean;
  elementId: string;
  title: string;
  modalInitialized: boolean;
  lastFocusedElement: any;
  firstTabStop: any;
  lastTabStop: any;
  focusableElements: any;
  private ngUnsubscribe = new Subject();

  // A list of elements that can recieve focus
  focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  @ContentChildren(forwardRef(() => ButtonComponent), { read: ElementRef, descendants: true }) buttonComponents: QueryList<ElementRef>;

  constructor(
    private modalService: ModalService, private elementRef: ElementRef, private renderer: Renderer2) {

    this.isOpen = false;
    this.modalService.modalOpened$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(elementId => {
        this.modalInitialized = false;
        this.elementId = elementId;
        this.openModal();
      });

    this.modalService.modalClosed$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(elementId => {
        this.elementId = elementId;
        this.closeModal();
      });

    this.modalService.modalUpdate$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(elementId => {
        this.elementId = elementId;
        this.initFocusableElements();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewChecked() {
    if (!this.modalInitialized && this.buttonComponents && this.buttonComponents.length > 0) {
      this.initFocusableElements();
      this.modalInitialized = true;
    }
  }

  initFocusableElements() {
    // Had to put this in a SetTimeout since the QuerySelector returned old objects from the last opened dialog otherwise
    setTimeout(() => {
      const focusableNodes: NodeList = this.elementRef.nativeElement.querySelectorAll(this.focusableElementsString);
      if (focusableNodes.length === 0) {
        return false;
      }
      this.focusableElements = Array.from(focusableNodes);

      this.firstTabStop = this.focusableElements[0];
      this.lastTabStop = this.focusableElements[this.focusableElements.length - 1];

      // Set focus default button if one is defined
      const defaultButtonComponent = this.buttonComponents && this.buttonComponents.find(x => x.nativeElement.getAttribute('default') === 'true');
      if (defaultButtonComponent) {
        const spanElement = defaultButtonComponent.nativeElement.children[0];
        if (spanElement) {
          // wait one lifecycle and set focus on the button element wrapped insde the span
          Promise.resolve(null).then(() => {
            spanElement.children[0].focus();
          });
        }
      } else {
        this.firstTabStop.focus();
      }
    }, 10);
  }

  private openModal() {
    this.isOpen = true;
    this.renderer.addClass(document.querySelector(`#${this.elementId}`), 'vgr-modal--open');
    this.renderer.addClass(document.body, 'modal--open');
  }

  private closeModal() {
    this.isOpen = false;
    this.renderer.removeClass(document.querySelector(`#${this.elementId}`), 'vgr-modal--open');
    this.renderer.removeClass(document.body, 'modal--open');
  }

  onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Tab':
        this.handleTabPress(e);
        break;
      case 'Escape':
        this.modalService.closeDialog(this.elementId);
        break;
      // Supporting IE and Edge
      case 'Esc':
        this.modalService.closeDialog(this.elementId);
        break;
    }
  }

  onOutsideClick(e: MouseEvent) {
    // Is event bubbling; Ignore
    if (e.eventPhase === Event.BUBBLING_PHASE) {
      return;
    }
    this.outsideClick.emit(e);
  }

  private handleTabPress(e: KeyboardEvent) {
    if (e.shiftKey) {
      // If Shift + Tab
      // If the current element in focus is the first focusable element within the modal window...
      if (document.activeElement === this.firstTabStop) {
        e.preventDefault();
        // ...jump to the last focusable element
        this.lastTabStop.focus();
      }
      // if Tab
    } else {
      // If the current element in focus is the last focusable element within the modal window...
      if (document.activeElement === this.lastTabStop) {
        e.preventDefault();
        // ...jump to the first focusable element
        this.firstTabStop.focus();
      }
    }
  }
}
