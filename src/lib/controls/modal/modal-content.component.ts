import { Component } from '@angular/core';

@Component({
  selector: 'vgr-modal-content',
  moduleId: module.id,
  template: `<ng-content></ng-content>`
})

export class ModalContentComponent {
  constructor() {
  }
}
