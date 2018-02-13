import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-expandable-div',
  templateUrl: './expandable-div.component.html',
  styleUrls: ['./expandable-div.component.scss']
})
export class ExpandableDivComponent implements OnInit {

  exampleCode = `<vgr-expandable-div [expanded]="false" (expandedChanged)="onExpandedChanged($event)">
  <vgr-expandable-div-header>
    <p>Denna div är collapsed från början</p>
  </vgr-expandable-div-header>
  <vgr-expandable-div-content>
    <p>Lite innehåll</p>
    <p>Mer innehåll</p>
  </vgr-expandable-div-content>
</vgr-expandable-div>`;

  exampleCodeMarkup;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.exampleCodeMarkup =
      htmlEncoder.prepareHighlightedSection(this.exampleCode, 'HTML');
  }

  ngOnInit() {
  }
  onExpandedChanged(flag: Boolean) { }
}
