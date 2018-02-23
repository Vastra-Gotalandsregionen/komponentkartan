import { Component, OnInit } from '@angular/core';
import { ModalService } from '@komponentkartan';

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
    this.modalService.openDialog( 'modal1');
  }

  showOneButtonModalOverview() {
    this.modalService.openDialog( 'modal2');
  }

  showTwoButtonModal() {
    this.modalService.openDialog('modal3');
  }


  showThreeButtonModal() {
    this.modalService.openDialog( 'modal4');
  }

  showSaveDontSaveCancelModal() {
    this.modalService.openSaveDontSaveCancelDialog('modal4');
  }

  showChooseVardvalWithTextModal() {
    this.modalService.openDialog( 'vardvalWithTextModal');
  }

  showChooseVardvalWithoutTextModal() {
    this.modalService.openDialog( 'vardvalWithoutTextModal');
  }

  showCommentAnswerWithTextModal() {
    this.modalService.openDialog( 'commentAnswerWithTextModal');
  }

  showCommentAnswerWithoutTextModal() {
    this.modalService.openDialog( 'commentAnswerWithoutTextModal');
  }

  showCommentModal() {
    this.modalService.openDialog( 'commentModal');
  }
}
