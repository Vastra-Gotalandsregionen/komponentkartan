
import {
    Component, ViewContainerRef, OnInit, AfterContentInit, QueryList, ElementRef, ContentChildren
} from '@angular/core';
import { ModalService, ModalConfiguration, ModalButtonConfiguration } from '../../services/modalService';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'vgr-modal',
    moduleId: module.id,
    templateUrl: './modal.component.html'
})

export class ModalPlaceholderComponent implements AfterContentInit {
    isOpen: boolean;
    elementId: string;
    title: string;
    buttons: ModalButtonConfiguration[];
    modalInitialized: boolean;
    lastFocusedElement: any;
    firstTabStop: any;
    lastTabStop: any;
    focusableElements: any;

    // A list of elements that can recieve focus
    focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';


    @ContentChildren(ButtonComponent, { read: ElementRef }) buttonComponents: QueryList<ElementRef>;
    constructor(
        private modalService: ModalService, private elementRef: ElementRef) {

        this.buttons = [];
        this.isOpen = false;
        this.modalService.modalOpened$.subscribe(args => {
            this.modalInitialized = false;
            this.elementId = args.elementId;
            this.buttons = args.buttons;
            this.openModal();

        });
    }

    ngAfterContentInit() {
        if (!this.modalInitialized && this.isOpen && this.buttonComponents && this.buttonComponents.length > 0) {
            this.initFocusableElements();
            this.modalInitialized = true;
        }
    }

    initFocusableElements() {
        // Had to put this in a SetTimeout since the QuerySelector returned old objects from the last opened dialog otherwise
        setTimeout(() => {
            const focusableNodes: NodeList = this.elementRef.nativeElement.querySelectorAll(this.focusableElementsString);
            this.focusableElements = Array.from(focusableNodes);

            this.firstTabStop = this.focusableElements[0];
            this.lastTabStop = this.focusableElements[this.focusableElements.length - 1];

            // Set default button if one is defined
            const defaultButton = this.buttonComponents.find(x => x.nativeElement.getAttribute('default') === 'true');
            if (defaultButton) {
                defaultButton.nativeElement.children[0].focus();
            } else {
                this.firstTabStop.focus();
            }
        }, 1);
    }

    private openModal() {
        this.isOpen = true;
        $('body').addClass('modal--open');
        $('#'+ this.elementId).addClass('vgr-modal--open');
    }

    private closeModal() {
        this.isOpen = false;
        $('body').removeClass('modal--open');
        $('#'+ this.elementId).removeClass('vgr-modal--open');

    }

    onButtonClick(callback: () => void) {
        callback();
        this.closeModal();
    }

    onKeyDown(e: any) {
        if (e.keyCode === 9) {
            // If Shift + Tab
            if (e.shiftKey) {
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


}
