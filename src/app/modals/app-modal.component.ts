import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '@komponentkartan';

@Component({
  selector: 'app-modals',
  moduleId: module.id,
  templateUrl: './app-modal.component.html'
})

export class AppModalComponent implements OnInit {
  vardvalForm: FormGroup;
  vardvalForm2: FormGroup;

  dropdownItems: Array<object>;


  constructor(private modalService: ModalService) {
    this.dropdownItems = [
      { displayName: 'Vårdcentral 1', value: '1' },
      { displayName: 'Vårdcentral 2', value: '2' },
      { displayName: 'Vårdcentral 3', value: '3' }
    ];
  }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.vardvalForm = new FormGroup({
      vardval: new FormControl(null, { validators: [Validators.required] }),
    }, { updateOn: 'change' });

    this.vardvalForm2 = new FormGroup({
      vardval: new FormControl(null, { validators: [Validators.required] }),
    }, { updateOn: 'change' });
  }

  closeModal(elementId: string): void {
    this.modalService.closeDialog(elementId);
  }
}


