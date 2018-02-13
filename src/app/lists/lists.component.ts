import { Component } from '@angular/core';
import { Examples } from './examples/examples';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {
  htmlBasicListStructureMarkup: string;
  examples: Examples = new Examples();

  constructor(htmlEncoder: HtmlEncodeService) {

    this.htmlBasicListStructureMarkup =
      htmlEncoder.prepareHighlightedSection(this.examples.htmlBasicListStructureMarkup);
  }
}
