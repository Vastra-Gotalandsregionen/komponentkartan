import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-page-block-documentation',
  templateUrl: './page-block-documentation.component.html'
})
export class PageBlockDocumentationComponent {
  exampleCodeMarkup: string;
  exampleCode =
`<vgr-page-block>
  <vgr-notification type="error">
    Något gick fel.
  </vgr-notification>
</vgr-page-block>`;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.exampleCodeMarkup =
      htmlEncoder.prepareHighlightedSection(this.exampleCode, 'HTML');
  }
}
