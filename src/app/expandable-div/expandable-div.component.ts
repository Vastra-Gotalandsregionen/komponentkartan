import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';
import { ExpandableDivComponent as ExpandableDivComponentElement } from '../../../projects/komponentkartan/src/lib';

@Component({
  selector: 'app-expandable-div',
  templateUrl: './expandable-div.component.html',
  styleUrls: ['./expandable-div.component.scss']
})
export class ExpandableDivComponent implements OnInit {
  @ViewChildren('myExpandableList', { read: ExpandableDivComponentElement }) myExpandableList: QueryList<ExpandableDivComponentElement>;

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
  list: any[];

  constructor(htmlEncoder: HtmlEncodeService) {
    this.exampleCodeMarkup =
      htmlEncoder.prepareHighlightedSection(this.exampleCode, 'HTML');
  }

  ngOnInit() {
    this.list = [
      {
        id: '1',
        title: 'Ettan',
        text: 'Ettans innehåll'
      },
      {
        id: '2',
        title: 'Tvåan',
        text: 'Tvåans innehåll'
      },
      {
        id: '3',
        title: 'Trean',
        text: 'Treans innehåll'
      }
    ];
  }

  setFocus() {
    const index = this.list.findIndex(x => x.id === '2');
    setTimeout(() => {
      this.myExpandableList.toArray()[index].focus();
    });
  }

  onExpandedChanged(flag: Boolean) { }
  onExpandedChanged1(flag: Boolean) { }
  onExpandedChanged2(flag: Boolean) { }
}
