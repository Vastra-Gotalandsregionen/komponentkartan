import { Component, Input } from '@angular/core';
import { ModalService } from '@komponentkartan';

@Component({
  selector: 'app-modals',
  moduleId: module.id,
  templateUrl: "./app-modal.component.html"
})

export class AppModalComponent {
  constructor(private modalService: ModalService) {
  }
  
  closeModal1(): void{
    this.modalService.closeDialog();
  }
}


