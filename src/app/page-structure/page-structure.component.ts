import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-page-structure',
  templateUrl: './page-structure.component.html',
  styleUrls: ['./page-structure.component.scss']
})
export class PageStructureComponent implements OnInit {

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
      <vgr-page-block>
        <!--Sidans andra block-->
      </vgr-page-block>
      <vgr-page-block>
        <!--Sidans n:te block -->
      </vgr-page-block>
    </vgr-page-body>
  </vgr-page>`;
  constructor(private htmlEncoder: HtmlEncodeService) {
    this.samplePageStructure = htmlEncoder.prepareHighlightedSection(this.samplePage);
  }

  ngOnInit() {
  }




}
