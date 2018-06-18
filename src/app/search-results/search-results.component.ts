import { Component, OnInit } from '@angular/core';
import { DropdownItem } from 'vgr-komponentkartan';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  items: any = this.getDemoItems(55);
  filteredItems: any;
  dropdownVisible = false;
  filterBoxValue: string;
  searchDescription = null;

  constructor() { }

  private getDemoItems(numberOfItems: number): DropdownItem<string>[] {
    const items: DropdownItem<string>[] = [];
    for (let i = 1; i <= numberOfItems; i++) {
      items.push({ value: `${i} - Min mottagning`, displayName: `${i} - Min mottagning`, displayNameWhenSelected: `Alt ${i}` } as DropdownItem<string>);
    }
    return items;
  }

  filterSearch(searchText: string = '') {
    if (!searchText || searchText.length < 3) {
      this.dropdownVisible = false;
      return;
    }
    this.filteredItems = this.items.filter(item => item.displayName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    this.searchDescription = this.filteredItems.length + ' träffar i "VGR" KIV.';
    this.dropdownVisible = true;
  }

  click(item) {
    console.log(item);
    this.filterBoxValue = item.value;
    this.dropdownVisible = false;
  }

  ngOnInit() {
  }

}
