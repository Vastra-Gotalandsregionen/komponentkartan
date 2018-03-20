import { Component, OnInit } from '@angular/core';
import { DropdownItem } from 'vgr-komponentkartan';

@Component({
  selector: 'app-dropdownmultiselect',
  templateUrl: './dropdownmultiselect.component.html',
  styleUrls: ['./dropdownmultiselect.component.scss']
})
export class DropdownmultiselectComponent implements OnInit {

  dropDownItems6: DropdownItem<string>[];
  dropDownItems6AndSelected: DropdownItem<string>[];
  dropDownItems6AndSelectedReadonly: DropdownItem<string>[];
  dropDownItems6AndThreeSelected: DropdownItem<string>[];
  dropDownItems7: DropdownItem<string>[];
  dropDownItems25: DropdownItem<string>[];
  dropDownItems25All: DropdownItem<string>[];
  dropDownItems200: DropdownItem<string>[];
  isReadonlyAndDisabled: boolean;
  dropDownItems7Readonly: DropdownItem<string>[];

  lastMultipleSelection: string;

  constructor() {
    this.dropDownItems6 = this.getDemoItemsMixedName(6);
    this.dropDownItems6AndSelected = this.getDemoItemsWithSelected(6, [1]);
    this.dropDownItems6AndThreeSelected = this.getDemoItemsWithSelected(6, [0, 2, 5]);
    this.dropDownItems7 = this.getDemoItemsMixedName(7);
    this.dropDownItems25All = this.getDemoItems(25);
    this.dropDownItems25 = this.getDemoItemsLongName(25);
    this.dropDownItems200 = this.getDemoItemsMixedName(200);
    this.dropDownItems6AndSelectedReadonly = this.getDemoItemsWithSelected(6, [1]);
    this.dropDownItems7Readonly = this.getDemoItemsMixedName(7);
    this.isReadonlyAndDisabled = true;
  }

  ngOnInit() {
  }

  private getDemoItems(numberOfItems: number): DropdownItem<string>[] {
    const items: DropdownItem<string>[] = [];
    for (let i = 1; i <= numberOfItems; i++) {
      items.push({ value: `Min mottagning ${i}`, displayName: `Min mottagning ${i}` } as DropdownItem<string>);
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

    const demoitems: string[] = ['En mottagning med långt namn', 'Min mottagning', 'Hennes mottagning', 'Hans mottagning', 'Evas mottagning', 'Karl-Johan Fredrikssons mottagning - Östra Göteborg'];

    for (let i = 1; i <= numberOfItems; i++) {
      const index = this.getRandomInt(0, 6);
      items.push({ value: `${demoitems[index]}`, displayName: `${demoitems[index]}` } as DropdownItem<string>);
    }
    return items;
  }

  private getDemoItemsWithSelected(numberOfItems: number, selectedIndexes: Array<number>): DropdownItem<string>[] {
    const list = this.getDemoItems(numberOfItems);
    list.forEach((dpItem, index) => {
      if (dpItem != null) {
        if (selectedIndexes.indexOf(index) > -1) {
          dpItem.selected = true;
        }
      }
    });
    return list;
  }

  onMultipleSelectionChanged(selectedItems: string[]) {
    this.lastMultipleSelection = selectedItems.join(',');
  }


  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
  }

}
