import { Component } from '@angular/core';

@Component({
    selector: 'vgr-modal-footer',
    template: `<ng-content></ng-content>`,
    standalone: false
})

export class ModalFooterComponent {

  constructor() {
  }
}
