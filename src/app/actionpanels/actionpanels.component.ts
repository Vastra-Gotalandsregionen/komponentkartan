import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HighlightCodeDirective } from '../directives/highlight-code.directive';
import { HtmlEncodeService } from '../html-encode.service';
@Component({
    selector: 'app-action-panel',
    templateUrl: './actionpanels.component.html',
    styleUrls: ['./actionpanels.component.scss'],
    standalone: false
})
export class ActionPanelsComponent {

  open1 = false;
  showCloseButton1 = true;
  open2 = false;
  openError = false;

  exampleCode = `
  <vgr-action-panel [showCloseButton]="true" (openChanged)="open=$event" [open]="open"
    [title]="'Ett exempel på en action panel'">
    <vgr-button>En knapp</vgr-button>
    <p>Lite text...</p>
  </vgr-action-panel>`;

  exampleCodeMarkup;


  vc_namn = [`Achima Care Uddevalla vårdcentral`,
  `Adina Hälsans Vårdcentral Nol`,
  `Allékliniken Sleipner Vårdcentral`,
  `Allemanshälsan vårdcentral - Lunden`,
  `Allemanshälsans vårdcentral - City`,
  `Backaplan Vårdcentral och BVC`,
  `Bohuspraktiken`,
  `Borås Vårdcentral`,
  `Bräcke Diakoni Vårdcentralen Centralhälsan`,
  `Bräcke Diakoni Vårdcentralen Centrum`,
  `Bräcke diakoni Vårdcentralen Malmen`,
  `Brämhults Vårdcentral`,
  `Capio Läkarhus Almö`,
  `Capio Läkarhus Angered`,
  `Capio Läkarhus Hjortmossen`,
  `Capio Läkarhus Kvillebäcken`,
  `Capio Läkarhus Lysekil`,
  `Capio Läkarhus Lödöse`,
  `Capio Läkarhus Selma`,
  `Capio Läkarhus Stenungsund`,
  `Capio Vårdcentral Amhult`,
  `Capio Vårdcentral Axess`,
  `Capio vårdcentral Grästorp`,
  `Capio Vårdcentral Gårda`,
  `Capio Vårdcentral Hovås`,
  `Capio Vårdcentral Lundby`,
  `Capio Vårdcentral Mölndal`,
  `Capio Vårdcentral Orust`,
  `Capio Vårdcentral Strömstad`,
  `Capio Vårdcentral Sävedalen`,
  `Centrumpraktiken`,
  `Cityläkarna Borås`,
  `Din Klinik`,
  `Din Vårdcentral i Lerum`,
  `Distriktsläkarna Kviberg Vårdcentral och BVC`,
  `Distriktsläkarna Mölndal Vårdcentral och BVC`,
  `Familjehälsan Vårdcentral`,
  `Familjeläkarna i Mölnlycke Vårdcentral och BVC`,
  `Gårdsten Vårdcentral`,
  `Hamnstadens Vårdcentral`,
  `Herkules Vårdcentral`,
  `HälsoBrunnen - vårdcentral`,
  `Hälsocentralen`,
  `Hälsocentralen i Tibro`,
  `Hönö Vårdcentral`,
  `JohannesVården - Vårdcentral och BVC`,
  `Kungsportsläkarna`,
  `Kvarterskliniken Husaren`,
  `Kvarterskliniken Lorensberg`,
  `Kvarterskliniken Tanum`,
  `Lextorp Vårdcentral`,
  `Läkargruppen Mölndalsbro`,
  `Läkarhus Kyrkbyn`,
  `Maria Alberts Vårdcentral`,
  `Medpro Clinic Brålanda - Torpa Vårdcentral`,
  `Medpro Clinic Lilla Edet Vårdcentral`,
  `Medpro Clinic Noltorp Vårdcentral`,
  `Medpro Clinic Stavre Vårdcentral`,
  `Medpro Clinic Åmål Vårdcentral`,
  `Nya Vårdcentralen Kortedala Torg`,
  `Nya Vårdcentralen Östra Göteborg`,
  `Närhälsan Angered vårdcentral`,
  `Närhälsan Backa vårdcentral`,
  `Närhälsan Bengtsfors vårdcentral`,
  `Närhälsan Billingen vårdcentral`,
  `Närhälsan Biskopsgården vårdcentral`,
  `Närhälsan Bjurslätt vårdcentral`,
  `Närhälsan Björkekärr vårdcentral`,
  `Närhälsan Boda vårdcentral`,
  `Närhälsan Bollebygd vårdcentral`,
  `Närhälsan Brämaregården vårdcentral`,
  `Närhälsan Bäckefors vårdcentral`,
  `Närhälsan Dagson vårdcentral`,
  `Närhälsan Dalaberg vårdcentral`,
  `Närhälsan Dals - Ed vårdcentral`,
  `Närhälsan Dalsjöfors vårdcentral`,
  `Närhälsan Ekmanska vårdcentral`,
  `Närhälsan Eriksberg vårdcentral`,
  `Närhälsan Fjällbacka vårdcentral`,
  `Närhälsan Floda vårdcentral`,
  `Närhälsan Fristad vårdcentral`,
  `Närhälsan Frölunda vårdcentral`,
  `Närhälsan Furulund vårdcentral`,
  `Närhälsan Färgelanda vårdcentral`,
  `Närhälsan Gamlestadstorget vårdcentral`,
  `Närhälsan Gibraltargatan vårdcentral`,
  `Närhälsan Gråbo vårdcentral`,
  `Närhälsan Guldvingen vårdcentral`,
  `Närhälsan Gullspång vårdcentral`,
  `Närhälsan Götene vårdcentral`,
  `Närhälsan Heimdal vårdcentral`,
  `Närhälsan Hentorp vårdcentral`,
  `Närhälsan Herrestad vårdcentral`,
  `Närhälsan Herrljunga vårdcentral`,
  `Närhälsan Hindås vårdcentral`,
  `Närhälsan Hjo vårdcentral`,
  `Närhälsan Hjällbo vårdcentral`,
  `Närhälsan Horred vårdcentral`,
  `Närhälsan Högsbo vårdcentral`,
  `Närhälsan Karlsborg vårdcentral`,
  `Närhälsan Kinna vårdcentral`,
  `Närhälsan Kongahälla vårdcentral`,
  `Närhälsan Krokslätt vårdcentral`,
  `Närhälsan Kungshamn vårdcentral`,
  `Närhälsan Kungshöjd vårdcentral`,
  `Närhälsan Kungssten vårdcentral`,
  `Närhälsan Källstorp vårdcentral`,
  `Närhälsan Kärra vårdcentral`,
  `Närhälsan Landvetter vårdcentral`,
  `Närhälsan Lerum vårdcentral`,
  `Närhälsan Lindome vårdcentral`,
  `Närhälsan Ljungskile vårdcentral`,
  `Närhälsan Lysekil vårdcentral`,
  `Närhälsan Lövgärdet vårdcentral`,
  `Närhälsan Majorna vårdcentral`,
  `Närhälsan Mariestad vårdcentral`,
  `Närhälsan Masthugget vårdcentral`,
  `Närhälsan Mellerud vårdcentral`,
  `Närhälsan Munkedal vårdcentral`,
  `Närhälsan Mölnlycke vårdcentral`,
  `Närhälsan Mösseberg vårdcentral`,
  `Närhälsan Norrmalm vårdcentral`,
  `Närhälsan Nossebro vårdcentral`,
  `Närhälsan Oden vårdcentral`,
  `Närhälsan Olskroken vårdcentral`,
  `Närhälsan Opaltorget vårdcentral`,
  `Närhälsan Partille vårdcentral`,
  `Närhälsan Sandared vårdcentral`,
  `Närhälsan Sannegården vårdcentral`,
  `Närhälsan Sisjön vårdcentral`,
  `Närhälsan Sjöbo vårdcentral`,
  `Närhälsan Skene vårdcentral`,
  `Närhälsan Skogslyckan vårdcentral`,
  `Närhälsan Slottsskogen vårdcentral`,
  `Närhälsan Solgärde vårdcentral`,
  `Närhälsan Sollebrunn vårdcentral`,
  `Närhälsan Stenstorp vårdcentral`,
  `Närhälsan Stenungsund vårdcentral`,
  `Närhälsan Stora Höga vårdcentral`,
  `Närhälsan Styrsö vårdcentral`,
  `Närhälsan Svenljunga vårdcentral`,
  `Närhälsan Sylte vårdcentral`,
  `Närhälsan Södra Ryd vårdcentral`,
  `Närhälsan Södra torget vårdcentral`,
  `Närhälsan Sörhaga vårdcentral`,
  `Närhälsan Tanumshede vårdcentral`,
  `Närhälsan Tibro vårdcentral`,
  `Närhälsan Tidaholm vårdcentral`,
  `Närhälsan Tidan vårdcentral`,
  `Närhälsan Tjörn vårdcentral`,
  `Närhälsan Torpavallen vårdcentral`,
  `Närhälsan Torslanda vårdcentral`,
  `Närhälsan Trandared vårdcentral`,
  `Närhälsan Tranemo vårdcentral`,
  `Närhälsan Tuve vårdcentral`,
  `Närhälsan Töreboda vårdcentral`,
  `Närhälsan Ulricehamn vårdcentral`,
  `Närhälsan Vara vårdcentral`,
  `Närhälsan Vargön vårdcentral`,
  `Närhälsan Vårgårda vårdcentral`,
  `Närhälsan Vänerparken vårdcentral`,
  `Närhälsan Ågårdsskogen vårdcentral`,
  `Närhälsan Älvängen vårdcentral`,
  `Närhälsan Ängabo vårdcentral`,
  `Närhälsan Öckerö vårdcentral`,
  `Nödinge Vårdcentral`,
  `Nötkärnan Bergsjön Vårdcentral och BVC`,
  `Nötkärnan Friskväderstorget Vårdcentral och BVC`,
  `Nötkärnan Hovås Askim Familjeläkare och BVC`,
  `Nötkärnan Kortedala Vårdcentral och BVC`,
  `Nötkärnan Kållered Familjeläkare och BVC`,
  `Nötkärnan Masthugget Familjeläkare och BVC`,
  `Nötkärnan Sävelången Familjeläkare och BVC`,
  `Omtanken Vårdcentral Frölunda Torg`,
  `Omtanken Vårdcentral Grimmered`,
  `Omtanken Vårdcentral Järnhälsan`,
  `Omtanken Vårdcentral Kållered`,
  `Omtanken Vårdcentral Landala`,
  `Omtanken Vårdcentral Majorna`,
  `Omtanken Vårdcentral Pedagogen Park`,
  `Omtanken Vårdcentral Åby`,
  `Plus7 Vårdcentralen`,
  `Primapraktiken`,
  `Rävlanda Vårdcentral`,
  `Skagerns Vård och Hälsoenhet`,
  `Sotenäs Vårdcentral i Hunnebostrand`,
  `Sätila Vårdcentral`,
  `Sävedalens Vårdcentral och BVC`,
  `Tranehälsan`,
  `Ugglans Vårdcentral Fredriksdal`,
  `Ugglans vårdcentral Landvetter`,
  `Unicare Vårdcentral Mariestad`,
  `Viskaforskliniken`,
  `Vårdcentralen Bohuslinden`,
  `Vårdcentralen Carlanderska`,
  `Vårdcentralen Centrum`,
  `Vårdcentralen Kusten`,
  `Vårdcentralen Läkarhuset`,
  `Vårdcentralen Nordstan`,
  `Vårdcentralen Silentzvägen`,
  `Vårdcentralen Vilan`,
  `Wästerläkarna`,
  `Wästerläkarna Redegatan`,
  `Älvpraktiken`,
  `Älvängens Läkarhus`
];
agarInformation =  ["Älvpraktiken"]; // this.vc_namn.slice();

form: FormGroup<any>;


  constructor(htmlEncoder: HtmlEncodeService, private fb: FormBuilder) {
    this.exampleCodeMarkup =
      htmlEncoder.prepareHighlightedSection(this.exampleCode, 'HTML');

      this.form = this.fb.group({
        agare: new FormControl('', Validators.required),
        })
  }

  setAgarinformation(event: any) {
    // if (this.agarInformation.length === 0) {
    //   return;
    // }

    if(event !== '') {
      const agare = this.vc_namn.filter(hamtadAgare => hamtadAgare === event)[0];

      if (event && agare !== this.form?.get('agare')?.value) {
        this.form?.get('agare')?.setValue(agare);
      }

      // if (agare.agarform === 1) {
      //   this.privatAgarform = true;
      // } else {
      //   this.privatAgarform = false;
      // }

      this.form.updateValueAndValidity();
    }

  }

  getActionText(open: boolean): string {
    if (open) {
      return 'Stäng';
    } else {
      return 'Öppna';
    }
  }

}
