import { Component, OnInit } from '@angular/core';
import { ModalService, ModalButtonConfiguration } from '@komponentkartan/index';

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
    this.modalService.openDialog('Detta är en dialog med en knapp', 'Här kan du bara välja ett alternativ',
      new ModalButtonConfiguration('OK', () => this.lastModalAnswer = 'OK')
    );
  }
  showOneButtonModalOverview() {
    this.modalService.openDialog('Detta är en dialog med en knapp', 'Här kan du bara välja ett alternativ',
      new ModalButtonConfiguration('OK', () => null)
    );
  }

  showTwoButtonModal() {
    this.modalService.openDialog('Acceptera villkor',
      'Denna fil innehåller personnummer på de personer som valt er vårdcentral tom 2017-01-31. ' +
      'För nedladdning av filen gäller följande villkor' +
      '1. Innehållet i filen får inte behandlas i strid med personuppgiftslagen (PuL) och patient-datalagen (PdL). ' +
      'Informationen får därför inte användas för annat ändamål än det för vilket uppgifterna samlats in ' +
      '(9 § punkt c och d PuL och 2 kap. 4 § PdL). ' +
      'Detta innebär bland annat att uppgifterna inte får användas för massutskick eller marknadsföring. ' +
      '2. Verksamhetschefen ansvarar för att endast den senaste månadens fil används för eventuell bearbetning av informationen. ' +
      'För att acceptera båda villkoren ovan, tryck [Jag accepterar] annars tryck [Avbryt]' +
      'Notera att systemet bokför vem som accepterat villkoren och tidpunkten för detta.' +
      'Notera även att alla register i verksamheten ska vara anmälda till utsett personuppgiftsombud eller Datainspektionen.',
      new ModalButtonConfiguration('Jag accepterar', () => this.lastModalAnswer = 'Jag accepterar'),
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt'),
    );
  }


  showThreeButtonModal() {
    this.modalService.openDialog('Vill du spara innan du stänger?', 'Ändringarna går förlorade om du inte sparar dem',
      new ModalButtonConfiguration('Ja', () => this.lastModalAnswer = 'Ja'),
      new ModalButtonConfiguration('Nej', () => this.lastModalAnswer = 'Nej'),
      new ModalButtonConfiguration('Avbryt', () => this.lastModalAnswer = 'Avbryt')
    );
  }

  showSaveDontSaveCancelModal() {
    this.modalService.openSaveDontSaveCancelDialog('Vill du spara innan du stänger?', 'Ändringarna går förlorade om du inte sparar.',
      () => this.lastModalAnswer = 'Sparade', () => this.lastModalAnswer = 'Sparade inte', () => this.lastModalAnswer = 'Avbröt');
  }


}
