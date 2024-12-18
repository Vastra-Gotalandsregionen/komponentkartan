import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

const htmlMarkup = `
<vgr-panel-container>
  <vgr-panel width="4" themecolor="green">
    <!-- html för panel-innehåll -->
  </vgr-panel>
  <vgr-panel width="8" themecolor="green">
    <!-- html för panel-innehåll -->
  </vgr-panel>
</vgr-panel-container>
<vgr-panel-container>
  <vgr-panel width="4" noborder="true">
    <!-- html för panel-innehåll -->
  </vgr-panel>
  <vgr-panel width="8" themecolor="red">
    <!-- html för panel-innehåll -->
  </vgr-panel>
</vgr-panel-container>
<vgr-panel-container>
  <vgr-panel width="6" >
    <!-- html för panel-innehåll -->
  </vgr-panel>
  <vgr-panel width="6">
    <!-- html för panel-innehåll -->
  </vgr-panel>
</vgr-panel-container>
<vgr-panel-container>
  <vgr-panel width="4" themecolor="green">
    <!-- html för panel-innehåll -->
  </vgr-panel>
  <vgr-panel width="4" themecolor="green">
    <!-- html för panel-innehåll -->
  </vgr-panel>
  <vgr-panel width="4" themecolor="green">
    <!-- html för panel-innehåll -->
  </vgr-panel>
</vgr-panel-container>`;

@Component({
    selector: 'app-panels',
    templateUrl: './panels.component.html',
    styleUrls: ['./panels.component.scss'],
    standalone: false
})
export class PanelsComponent implements OnInit {
  htmlMarkup: string;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.htmlMarkup =
      htmlEncoder.prepareHighlightedSection(htmlMarkup);
  }

  ngOnInit() {
  }

}
