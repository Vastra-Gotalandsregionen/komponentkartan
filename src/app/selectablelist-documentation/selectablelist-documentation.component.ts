import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
