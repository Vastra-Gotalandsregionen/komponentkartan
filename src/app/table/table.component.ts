import { Component, OnInit, ViewChild } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';
import { TableComponent as TableComponentElement } from '../../../projects/komponentkartan/src/lib';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: false
})
export class TableComponent implements OnInit {
  @ViewChild('myTableNo1', { read: TableComponentElement, static: false }) myTableNo1: TableComponentElement;
  @ViewChild('myTableNo2', { read: TableComponentElement, static: false }) myTableNo2: TableComponentElement;
  @ViewChild('myTableNo3', { read: TableComponentElement, static: false }) myTableNo3: TableComponentElement;
  htmlTableStructureMarkup = `
  <vgr-table>
  <!-- Rootelementet -->
   <vgr-table-header>
   <!-- Header kan inhehålla flera kolumn-headers -->
    <vgr-table-header-column>
    <!-- Lägg rubriktext i kolumn-header här -->
    </vgr-table-header-column>
   </vgr-table-header>
   <vgr-table-row>
   <!-- Motsvarar en rad -->
    <vgr-table-row-column>
    <!-- Lägg kolumntext här -->
    </vgr-table-row-column>
   </vgr-table-row>
  </vgr-table>`;

  htmlMarkup: string;
  constructor(private htmlEncoder: HtmlEncodeService) {
    this.htmlMarkup =
      htmlEncoder.prepareHighlightedSection(this.htmlTableStructureMarkup);
  }

  ngOnInit() {
  }

  setFocus(tableNo: number) {
    setTimeout(() => {
      switch (tableNo) {
        case 1:
          this.myTableNo1.focus();
          break;
        case 2:
          this.myTableNo2.focus();
          break;
        case 3:
          this.myTableNo3.focus();
          break;

        default:
          this.myTableNo1.focus();
      }
    });
  }

}
