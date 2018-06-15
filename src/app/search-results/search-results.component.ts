import { Component, OnInit } from '@angular/core';
import { DropdownItem } from 'vgr-komponentkartan';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  items: any = this.getDemoItems(25);
  dropdownVisible = false;

  constructor() { }

  private getDemoItems(numberOfItems: number): DropdownItem<string>[] {
    const items: DropdownItem<string>[] = [];
    for (let i = 1; i <= numberOfItems; i++) {
      items.push({ value: `${i} - Min mottagning`, displayName: `${i} - Min mottagning`, displayNameWhenSelected: `Alt ${i}` } as DropdownItem<string>);
    }
    return items;
  }

  click(item) {
    console.log('test', item);
  }

  ngOnInit() {
  }

}
