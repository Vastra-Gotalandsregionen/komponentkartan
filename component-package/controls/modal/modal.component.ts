
import { Component, ViewContainerRef, OnInit, ViewChild } from "@angular/core";
import { ModalService, ModalConfiguration, ModalButtonConfiguration } from "../../services/modalService";

@Component({
  selector: "vgr-modal",
  moduleId: module.id,
  templateUrl: "./modal.component.html"
})

export class ModalPlaceholderComponent {
  isOpen: boolean;
  message: string;
  title: string;
  buttons: ModalButtonConfiguration[];
  constructor(
    private modalService: ModalService) {

    this.buttons = [];
    this.isOpen = false;
    this.modalService.modalOpened$.subscribe(args => {
      this.message = args.message;
      this.title = args.title;
      this.buttons = args.buttons;
      this.openModal();
    });


  }

  private openModal() {
    this.isOpen = true;
  }

  private closeModal() {
    this.isOpen = false;
  }

  onButtonClicked(callback: () => void) {
    callback();
    this.closeModal();
  }



}