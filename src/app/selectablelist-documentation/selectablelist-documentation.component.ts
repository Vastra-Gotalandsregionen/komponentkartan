import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'vgr-selectablelist-documentation',
  templateUrl: './selectablelist-documentation.component.html',
  styleUrls: ['./selectablelist-documentation.component.scss']
})
export class SelectablelistDocumentationComponent implements OnInit {

  justeringar = [
    {
      period: new Date('2022-09-29T13:41:49.407'),
      belopp: 100,
      beskrivning: 'En testbeskrivning'
    },
    {
      period: new Date('2023-09-29T13:41:49.407'),
      belopp: 200,
      beskrivning: 'En testbeskrivning2'
    },
    {
      period: new Date('2024-09-29T13:41:49.407'),
      belopp: 300,
      beskrivning: 'En testbeskrivning3'
    },
    {
      period: new Date('2025-09-29T13:41:49.407'),
      belopp: 400,
      beskrivning: 'En testbeskrivning4'
    },
    {
      period: new Date('2025-09-29T13:41:49.407'),
      belopp: 400,
      beskrivning: 'En testbeskrivning4'
    },
    {
      period: new Date('2025-09-29T13:41:49.407'),
      belopp: 400,
      beskrivning: 'En testbeskrivning4'
    },
    {
      period: new Date('2025-09-29T13:41:49.407'),
      belopp: 400,
      beskrivning: 'En testbeskrivning4'
    },
    {
      period: new Date('2025-09-29T13:41:49.407'),
      belopp: 400,
      beskrivning: 'En testbeskrivning4'
    },
    {
      period: new Date('2025-09-29T13:41:49.407'),
      belopp: 400,
      beskrivning: 'En testbeskrivning4'
    },
    {
      period: new Date('2025-09-29T13:41:49.407'),
      belopp: 400,
      beskrivning: 'En testbeskrivning4'
    }
  ]

  exampleCode = `<vgr-selectablelist [id]="'test'" [active]="true (selectedChanged)="onSelectablelistChanged($event)">
      <vgr-selectablelist-header>
          <vgr-selectablelist-header-column><strong>Utbetalning avser</strong>
          </vgr-selectablelist-header-column>
          <vgr-selectablelist-header-column><strong>Månad</strong></vgr-selectablelist-header-column>
          <vgr-selectablelist-header-column [alignRight]="true"><strong>Belopp</strong>
          </vgr-selectablelist-header-column>
        </vgr-selectablelist-header>
      <vgr-selectablelist-row *ngFor="let justering of justeringar; let i = index" [value]="justering">
        <vgr-selectablelist-column>{{justering.beskrivning}}...
        </vgr-selectablelist-column>
        <vgr-selectablelist-column>{{justering.period | date: 'MMM YYYY'}}
        </vgr-selectablelist-column>
        <vgr-selectablelist-column [alignRight]="true">{{justering.belopp}}
        </vgr-selectablelist-column>
      </vgr-selectablelist-row>
  </vgr-selectablelist>`;
  exampleCodeMarkup: string = '';

  constructor(htmlEncoder: HtmlEncodeService) {
    this.exampleCodeMarkup =
      htmlEncoder.prepareHighlightedSection(this.exampleCode, 'HTML');
   }

  ngOnInit(): void {
  }

  onSelectablelistChanged(event) {
    console.log(event)
  }

}
