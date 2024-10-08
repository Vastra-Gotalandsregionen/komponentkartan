import { Component } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-pipes-documentation',
  templateUrl: './pipes-documentation.component.html',
  styleUrls: ['./pipes.documentation.component.scss']
})
export class PipesDocumentationComponent {

  samplePageStructure: string;
  samplePage = `
  <vgr-page>
    <vgr-page-header>
      <!-- Lägg innehåll i header här -->
    </vgr-page-header>
    <vgr-page-body>
      <!--Detta är en container för sidans olika block -->
      <vgr-page-block>
        <!--Sidans första block-->
      </vgr-page-block>
      <vgr-action-panel>
        <!--Sidans första action panel-->
      </vgr-action-panel>
      <vgr-page-block>
        <!--Sidans andra block-->
      </vgr-page-block>
    </vgr-page-body>
  </vgr-page>`;
  constructor(private htmlEncoder: HtmlEncodeService) {
    this.samplePageStructure = htmlEncoder.prepareHighlightedSection(this.samplePage);
  }




}
