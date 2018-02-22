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
    this.modalService.openDialog('Detta är en dialog med en knapp', 'modal1',
      new ModalButtonConfiguration('OK', () => this.lastModalAnswer = 'OK'),
    );
  }
  showOneButtonModalOverview() {
    this.modalService.openDialog('Detta är en dialog med en knapp', 'modal2',
      new ModalButtonConfiguration('OK', () => null)
    );
  }

  showTwoButtonModal() {
    this.modalService.openDialog('Acceptera villkor', 'modal3',
      new ModalButtonConfiguration('Jag accepterar', () => this.lastModalAnswer = 'Jag accepterar'),
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt'),
    );
  }


  showThreeButtonModal() {
    this.modalService.openDialog('Vill du spara innan du stänger?', 'modal4',
      new ModalButtonConfiguration('Ja', () => this.lastModalAnswer = 'Ja'),
      new ModalButtonConfiguration('Nej', () => this.lastModalAnswer = 'Nej'),
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt')
    );
  }

  showSaveDontSaveCancelModal() {
    this.modalService.openSaveDontSaveCancelDialog('Vill du spara innan du stänger?', 'modal4',
      () => this.lastModalAnswer = 'Sparade', () => this.lastModalAnswer = 'Sparade inte', () => this.lastModalAnswer = 'Avbröt');
  }


}
