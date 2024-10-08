import { Component } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-pipes-documentation',
  templateUrl: './pipes-documentation.component.html',
  styleUrls: ['./pipes.documentation.component.scss']
})
export class PipesDocumentationComponent {

  pipesPageStructure: string;
  pipesPage = `<div>{{ 120 | komponentkartanCurrency }}</div> // Output 120,00
  <div>{{ 'SEZZZZZZZZZZ-E0XXXXXXXXXX60' | hsaidPipe }}</div> // Output E0XXXXXXXXXX60
  <div>{{ '47700' | postnummer }}</div> // Output 477 00
  <div>{{ '191212121212' | personnummer }}</div> // Output 19121212-1212`;
  constructor(private htmlEncoder: HtmlEncodeService) {
    this.pipesPageStructure = htmlEncoder.prepareHighlightedSection(this.pipesPage);
  }




}
