import { Component, OnInit } from '@angular/core';
import { ModalService } from 'vgr-komponentkartan';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modaldialog',
  templateUrl: './modaldialog.component.html',
  styleUrls: ['./modaldialog.component.scss']
})
export class ModaldialogComponent implements OnInit {
  vardvalForm: FormGroup;
  vardvalForm2: FormGroup;
  vardval1Answer: string;
  vardval2Answer: string;
  dropdownItems = [];

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

  showOneButtonModal() {
    this.modalService.openDialog('modal1');
  }

  showOneButtonModalOverview() {
    this.modalService.openDialog('modal2');
  }

  showTwoButtonModal() {
    this.modalService.openDialog('modal3');
  }


  showThreeButtonModal() {
    this.modalService.openDialog('modal4');
  }

  showSaveDontSaveCancelModal() {
    this.modalService.openDialog('modal4');
  }

  showChooseVardvalWithTextModal() {
    this.modalService.openDialog('vardvalWithTextModal');
  }

  showChooseVardvalWithoutTextModal() {
    this.modalService.openDialog('vardvalWithoutTextModal');
  }

  showCommentAnswerWithTextModal() {
    this.modalService.openDialog('commentAnswerWithTextModal');
  }

  showCommentAnswerWithoutTextModal() {
    this.modalService.openDialog('commentAnswerWithoutTextModal');
  }

  showCommentModal() {
    this.modalService.openDialog('commentModal');
  }

  createForms() {
    this.vardvalForm = new FormGroup({
      vardval: new FormControl(null, { validators: [Validators.required] }),
    }, { updateOn: 'change' });

    this.vardvalForm2 = new FormGroup({
      vardval: new FormControl(null, { validators: [Validators.required] }),
    }, { updateOn: 'change' });
  }

  selectVardval1() {
    const index = this.vardvalForm.controls.vardval.value - 1;
    this.vardval1Answer = this.dropdownItems[index] ? this.dropdownItems[index].displayName : '';
    this.modalService.closeDialog('vardvalWithTextModal');
    this.vardvalForm.reset();

  }

  selectVardval2() {
    const index = this.vardvalForm2.controls.vardval.value - 1;
    this.vardval2Answer = this.dropdownItems[index] ? this.dropdownItems[index].displayName : '';
    this.modalService.closeDialog('vardvalWithoutTextModal');
    this.vardvalForm2.reset();
  }

  closeSelectVardval1() {
    this.modalService.closeDialog('vardvalWithTextModal');
    this.vardval1Answer = '';
    this.vardvalForm.reset();
  }

  closeSelectVardval2() {
    this.modalService.closeDialog('vardvalWithoutTextModal');
    this.vardval2Answer = '';
    this.vardvalForm2.reset();
  }

  closeModal(elementId: string): void {
    this.modalService.closeDialog(elementId);
  }
}