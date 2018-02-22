import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';
import { RowNotification, NotificationType } from 'vgr-komponentkartan';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  cardExampleMarkup: string;
  cardExampleMarkup2: string;
  unlocked: boolean;
  birthDate: Date;
  cardExample = `<vgr-card>
  <vgr-card-header>
    <vgr-save-cancel class="flex-right" [secondary]="true" (unlock)="unlocked = true"
    (save)="unlocked = false" (cancel)="unlocked = false"></vgr-save-cancel>
  </vgr-card-header>
  <vgr-card-column>
    <vgr-card-section [expanded]="true" [title]="'Rubrik'" [subtitle]="'Personuppgifter'" [readonly]="!unlocked">
    <vgr-title-value-layout>

        <vgr-title-value [title]="'Förnamn'" [slim]="!unlocked">
          <vgr-input [value]="'Per-Åke'" [readonly]="!unlocked"></vgr-input>
        </vgr-title-value>
        <vgr-title-value [title]="'Efternamn'" [slim]="!unlocked">
          <vgr-input [value]="'Berg'" [readonly]="!unlocked"></vgr-input>
        </vgr-title-value>
        <vgr-title-value [title]="'Boende'" [slim]="!unlocked">
          <vgr-dropdown [values]="['Hus','Lägenhet','Kartong']" [selectedValue]="'Hus'" [readonly]="!unlocked"></vgr-dropdown>
        </vgr-title-value>
        <vgr-title-value [title]="'Födelsedatum'" [slim]="!unlocked">
          <vgr-datepicker [selectedDate]="birthDate" [readonly]="!unlocked"></vgr-datepicker>
        </vgr-title-value>
        <vgr-title-value [title]="'Serienummer'" [slim]="!unlocked">
          <span>7a787b27-c2cc-441f-a732</span>
        </vgr-title-value>
     </vgr-title-value-layout>
    </vgr-card-section>
    <vgr-card-section [expanded]="true" [title]="'Rubrik'" [subtitle]="'Adressuppgifter'">
     <vgr-title-value-layout>
        <vgr-title-value [title]="'Kommun'" [slim]="true">
          <span>Vänersborg</span>
        </vgr-title-value>
        <vgr-title-value [title]="'Besöksaddress'" [slim]="true">
          <span>Duellvägen
            <br>462 60
            <br>Vänersborg
          </span>
        </vgr-title-value>
        <vgr-title-value [title]="'Geokod (PT90)'" [slim]="true">
          <span>x: 6471784</span>
        </vgr-title-value>
      </vgr-title-value-layout>
    </vgr-card-section>
  </vgr-card-column>
  <vgr-card-column>
    <vgr-card-section [expanded]="false" [title]="'Rubrik'" [subtitle]="'Övrig information'">
      <span>Innehåll</span>
    </vgr-card-section>
  </vgr-card-column>
</vgr-card>`;

  cardExample2 = ` <vgr-card>
  <vgr-card-header>
    <vgr-save-cancel class="flex-right" [secondary]="true" (unlock)="unlocked = true"
    (save)="unlocked = false" (cancel)="unlocked = false"></vgr-save-cancel>
  </vgr-card-header>
  <vgr-card-column>
      <table style="width:100%;text-align:left">
        <!-- Table data -->
      </table>
  </vgr-card-column>
</vgr-card>`;

  notification: RowNotification;
  constructor(htmlEncoder: HtmlEncodeService) {
    this.notification = {
      message: 'Meddelande som visas här, visas även när kortet är öppet. Meddelande som visas här, visas även när kortet är öppet. Meddelande som visas här,', icon: 'vgr-icon-exclamation',
      type: NotificationType.Permanent
    } as RowNotification;

    this.cardExampleMarkup = htmlEncoder.prepareHighlightedSection(this.cardExample);
    this.cardExampleMarkup2 = htmlEncoder.prepareHighlightedSection(this.cardExample2);
    this.birthDate = new Date(1976, 5, 17);
  }
  ngOnInit() {
  }

}
