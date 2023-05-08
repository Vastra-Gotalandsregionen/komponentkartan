import { Component, OnInit } from '@angular/core';
import { SearchResultItem } from 'vgr-komponentkartan';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  items: SearchResultItem[] = this.getDemoItems(55);
  items_e2: SearchResultItem[] = this.getDemoItems(13, true);
  output: SearchResultItem;
  filteredItems: any;
  filteredItems_e2: any;
  dropdownVisible = false;
  dropdownVisible_e1 = false;
  dropdownVisible_e2 = false;
  filterBoxValue_e1 = '';
  filterBoxValue_e2: string;
  searchDescription_e1 = null;
  htmlExample1;
  htmlExample2;
  sokningPagar: boolean = false;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.htmlExample1 = htmlEncoder.prepareHighlightedSection(`<div class="search-result-wrapper">
    <vgr-input type="search" (keydown)="filterSearch($event)" [value]="filterBoxValue_e1"></vgr-input>
    <vgr-search-result [items]="filteredItems" [visible]="dropdownVisible_e1"
    maxItems="15" [description]="searchDescription_e1" (itemClick)="setResult($event)"></vgr-search-result>
  </div>`, 'html');

  this.htmlExample2 = htmlEncoder.prepareHighlightedSection(`<div class="search-result-wrapper">
  <vgr-input [(ngModel)]="filterBoxValue_e2" style="display: inline-flex;"></vgr-input>
  <vgr-button (click)="filterSearch_e2($event)">Sök</vgr-button>
  <vgr-search-result [items]="filteredItems_e2" [(visible)]="dropdownVisible_e2" [width]="'500px'"
  maxItems="15" noResultsText="Inga resultat hittades." (itemClick)="setResult_e2($event)"></vgr-search-result>
</div>`, 'html');
  }

  private getDemoItems(numberOfItems: number, addSecondRow: boolean = false): SearchResultItem[] {
    const items: SearchResultItem[] = [];
    for (let i = 1; i <= numberOfItems; i++) {
      const name = Math.random() > 0.7 ? `${i} - Min mottagning har ett jättelångt namn` : `${i} - Min mottagning`;
      const displayName = new Array(name);
      const item: any = {};
      if (addSecondRow) {
        displayName.push('Placering');
        item.secondRowItalic = true;
      }
      item.value = name;
      item.displayName = displayName;
      items.push( item as SearchResultItem);
    }
    return items;
  }

  filterSearch(event) {


      const searchText = event.target.value;



    if (!searchText || searchText.length < 3) {
      this.dropdownVisible_e1 = false;
      return;
    }
    this.filteredItems = this.items.filter(item => item.displayName.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    this.searchDescription_e1 = this.filteredItems.length + ' träffar i "VGR" KIV.';
    this.dropdownVisible_e1 = true;

  }

  filterSearch_e2(event) {
    this.sokningPagar = true;

    setTimeout(() => {
    const searchText = this.filterBoxValue_e2;
    if (searchText) {
      this.filteredItems_e2 = this.items_e2.filter(item => item.displayName.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
      this.dropdownVisible_e2 = true;
    }

    this.sokningPagar = false;
  }, 2000);
  }

  setResult(item) {
    this.filterBoxValue_e1 = item.value;
    this.dropdownVisible_e1 = false;
  }

  setResult_e2(item) {
    this.filterBoxValue_e2 = item.value;
    this.dropdownVisible_e2 = false;
  }

  closeDropdown(value) {
    this.dropdownVisible = false;
    this.output = value;
  }

  openDropdown() {
    this.dropdownVisible = true;
  }

  ngOnInit() {

  }

}
