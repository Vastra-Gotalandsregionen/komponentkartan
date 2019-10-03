import { Component } from '@angular/core';
import { Examples } from '../lists/examples/examples';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'vgr-grid-documentation',
  templateUrl: './grid-documentation.component.html',
  styleUrls: ['./grid-documentation.component.css']
})
export class GridDocumentationComponent  {
  htmlBasicListStructureMarkup: string;
  examples: Examples = new Examples();

  constructor(htmlEncoder: HtmlEncodeService) {

    this.htmlBasicListStructureMarkup =
      htmlEncoder.prepareHighlightedSection(this.examples.htmlBasicListStructureMarkup);
  }
}