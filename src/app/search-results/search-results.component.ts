import { Component, OnInit, ContentChild, ViewChild } from '@angular/core';
import { SearchResultItem, SearchResultComponent } from 'vgr-komponentkartan';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  items: SearchResultItem[] = this.getDemoItems(55);
  items_e2: SearchResultItem[] = this.getDemoItems(13, true);
  filteredItems: any;
  filteredItems_e2: any;
  dropdownVisible = false;
  dropdownVisible_e1 = false;
  dropdownVisible_e2 = false;
  filterBoxValue_e1: string;
  searchDescription_e1 = null;

  //@ViewChild(SearchResultComponent) searchResult: SearchResultComponent;


  constructor() {
  }

  private getDemoItems(numberOfItems: number, addSecondRow: boolean = false): SearchResultItem[] {
    const items: SearchResultItem[] = [];
    for (let i = 1; i <= numberOfItems; i++) {
      const name = `${i} - Min mottagning`;
      const displayName = new Array(name);
      if (addSecondRow) {
        displayName.push('Placering');
      }

      items.push({ value: name, displayName: displayName, secondRowItalic: true } as SearchResultItem);
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
    const searchText = event.target.value;
    console.log(searchText);

    if (!searchText || searchText.length < 3) {
      this.dropdownVisible_e2 = false;
      return;
    }
    this.filteredItems_e2 = this.items_e2.filter(item => item.displayName.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    console.log(this.filteredItems_e2);
    //this.searchDescription_e2 = this.filteredItems.length + ' träffar i "VGR" KIV.';
    this.dropdownVisible_e2 = true;
  }

  setResult(item) {
    this.filterBoxValue_e1 = item.value;
    this.dropdownVisible_e1 = false;
  }

  ngOnInit() {
    //this.searchResult.itemClick.subscribe((item) => this.setResult(item));
  }

}
