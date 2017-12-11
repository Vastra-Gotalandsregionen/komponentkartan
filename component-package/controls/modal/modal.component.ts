
import { Component, ViewContainerRef, OnInit, ViewChildren, AfterViewChecked, QueryList, ElementRef } from '@angular/core';
import { ModalService, ModalConfiguration, ModalButtonConfiguration } from '../../services/modalService';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'vgr-modal',
    moduleId: module.id,
    templateUrl: './modal.component.html'
})

export class ModalPlaceholderComponent implements OnInit, AfterViewChecked {
    isOpen: boolean;
    message: string;
    title: string;
    buttons: ModalButtonConfiguration[];
    modalInitialized: boolean;
    @ViewChildren(ButtonComponent) buttonComponents: QueryList<ButtonComponent>;
    constructor(
        private modalService: ModalService, private elementRef: ElementRef) {

        this.buttons = [];
        this.isOpen = false;
        this.modalService.modalOpened$.subscribe(args => {
            this.modalInitialized = false;
            this.message = args.message;
            this.title = args.title;
            this.buttons = args.buttons;
            this.openModal();

        });
    }

    ngOnInit() {

    }

    ngAfterViewChecked() {
        if (!this.modalInitialized && this.buttonComponents && this.buttonComponents.length > 0) {
            this.buttonComponents.first.focus();
            this.modalInitialized = true;
        }
    }

    onBlur(event: FocusEvent) {
        if (!this.isDescendant(this.elementRef.nativeElement, event.relatedTarget)) {
            if (this.buttonComponents.first.isElement(event.target)) {
                this.buttonComponents.last.focus();
            } else {
                this.buttonComponents.first.focus();
            }
        }
    }

    isDescendant(parent, child) {
        if (!child) {
            return false;
        }
        let node = child.parentNode;
        while (node != null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    private openModal() {
        this.isOpen = true;
        $('body').addClass('modal--open');
    }

    private closeModal() {
        this.isOpen = false;
        $('body').removeClass('modal--open')

    }

    onClicked(callback: () => void) {
        callback();
        this.closeModal();
    }



}
