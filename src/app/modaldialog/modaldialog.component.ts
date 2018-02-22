import { Component, OnInit } from '@angular/core';
import { ModalService, ModalButtonConfiguration } from '@komponentkartan';

@Component({
  selector: 'app-modaldialog',
  templateUrl: './modaldialog.component.html',
  styleUrls: ['./modaldialog.component.scss']
})
export class ModaldialogComponent implements OnInit {
  constructor(private modalService: ModalService) { }
  lastModalAnswer: string;

  ngOnInit() {
  }

  showOneButtonModal() {
    this.modalService.openDialog( 'modal1',
      new ModalButtonConfiguration('OK', () => this.lastModalAnswer = 'OK'),
    );
  }

  showOneButtonModalOverview() {
    this.modalService.openDialog( 'modal2',
      new ModalButtonConfiguration('OK', () => null)
    );
  }

  showTwoButtonModal() {
    this.modalService.openDialog('modal3',
      new ModalButtonConfiguration('Jag accepterar', () => this.lastModalAnswer = 'Jag accepterar'),
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt'),
    );
  }


  showThreeButtonModal() {
    this.modalService.openDialog( 'modal4',
      new ModalButtonConfiguration('Ja', () => this.lastModalAnswer = 'Ja'),
      new ModalButtonConfiguration('Nej', () => this.lastModalAnswer = 'Nej'),
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt')
    );
  }

  showSaveDontSaveCancelModal() {
    this.modalService.openSaveDontSaveCancelDialog('modal4',
      () => this.lastModalAnswer = 'Sparade', () => this.lastModalAnswer = 'Sparade inte', () => this.lastModalAnswer = 'Avbröt');
  }

  showChooseVardvalWithTextModal() {
    this.modalService.openDialog( 'vardvalWithTextModal',
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt'),
      new ModalButtonConfiguration('Skriv ut', () => this.lastModalAnswer = 'Skriv ut'),
    );
  }

  showChooseVardvalWithoutTextModal() {
    this.modalService.openDialog( 'vardvalWithoutTextModal',
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt'),
      new ModalButtonConfiguration('Skriv ut', () => this.lastModalAnswer = 'Skriv ut'),
    );
  }

  showCommentAnswerWithTextModal() {
    this.modalService.openDialog( 'commentAnswerWithTextModal',
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt'),
      new ModalButtonConfiguration('Svara', () => this.lastModalAnswer = 'Svara'),
    );
  }

  showCommentAnswerWithoutTextModal() {
    this.modalService.openDialog( 'commentAnswerWithoutTextModal',
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt'),
      new ModalButtonConfiguration('Svara', () => this.lastModalAnswer = 'Svara'),
    );
  }

  showCommentModal() {
    this.modalService.openDialog( 'commentModal',
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt'),
      new ModalButtonConfiguration('Spara', () => this.lastModalAnswer = 'Spara'),
    );
  }
}
