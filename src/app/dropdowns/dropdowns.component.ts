import { Component, OnInit } from '@angular/core';
import { DropdownItem } from '@komponentkartan';
@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})
export class DropdownsComponent implements OnInit {

  dropDownItems25: DropdownItem<string>[];
  dropDownItems200: DropdownItem<string>[];
  dropDownItems9: DropdownItem<string>[];
  dropDownItems8AndSelected: DropdownItem<string>[];
  lastSingleSelection: string;
  dropDownItems25All: DropdownItem<string>[];
  dropDownItems8: DropdownItem<string>[];
  isReadonlyAndDisabled: boolean;

  constructor() {
    this.dropDownItems25 = this.getDemoItems(25);
    this.dropDownItems200 = this.getDemoItemsMixedName(200);
    this.dropDownItems8 = this.getDemoItemsMixedName(8);
    this.dropDownItems8AndSelected = this.getDemoItemsWithOneSelected(8, 2);
    this.dropDownItems9 = this.getDemoItemsLongName(9);
    this.dropDownItems25All = this.getDemoItemsMixedName(25);
    this.isReadonlyAndDisabled = true;
  }

  ngOnInit() {
  }

  private getDemoItems(numberOfItems: number): DropdownItem<string>[] {
    const items: DropdownItem<string>[] = [];
    for (let i = 1; i <= numberOfItems; i++) {
      items.push({ value: `${i} - Min mottagning`, displayName: `${i} - Min mottagning`, displayNameWhenSelected: `Alt ${i}` } as DropdownItem<string>);
    }
    return items;
  }

  private getDemoItemsLongName(numberOfItems: number): DropdownItem<string>[] {
    const items: DropdownItem<string>[] = [];
    for (let i = 1; i <= numberOfItems; i++) {
      items.push({ value: `${i} - En mottagning med långt namn i landstinget`, displayName: `${i} - En mottagning med långt namn i landstinget`, displayNameWhenSelected: `Alt ${i}` } as DropdownItem<string>);
    }
    return items;
  }


  private getDemoItemsMixedName(numberOfItems: number): DropdownItem<string>[] {
    const items: DropdownItem<string>[] = [];

    const demoitems: string[] = ['En mottagning med långt namn', 'Min mottagning', 'Hennes mottagning', 'Hans mottagning', 'Evas mottagning', 'Karl-Johan Fredrikssons mottagning - Östra Göteborg', 'Karl-Johan Fredrikssons mottagning - Västra Göteborg'];

    for (let i = 1; i <= numberOfItems; i++) {
      const index = this.getRandomInt(0, 7);
      items.push({ value: `${i} - ${demoitems[index]}`, displayName: `${demoitems[index]}` } as DropdownItem<string>);
    }
    return items;
  }

  private getDemoItemsWithOneSelected(numberOfItems: number, selectedIndex: number): DropdownItem<string>[] {
    const list = this.getDemoItemsMixedName(numberOfItems);
    list.forEach((dpItem, index) => {
      if (dpItem != null) {
        if (index === selectedIndex) {
          dpItem.selected = true;
        }
      }
    });
    return list;
  }

  onSingleSelectionChanged(selectedItemValue: string) {
    this.lastSingleSelection = selectedItemValue;
  }


  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
  }

}
