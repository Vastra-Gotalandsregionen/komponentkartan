import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

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

}
