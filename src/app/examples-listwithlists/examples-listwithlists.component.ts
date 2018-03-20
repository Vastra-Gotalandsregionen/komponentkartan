import { Component, Output, ChangeDetectorRef } from '@angular/core';
import { RowNotification, NotificationType, SortDirection, SortChangedArgs, ExpandableRow } from 'vgr-komponentkartan';
import { ExampleUnit } from './unit.model';
import { ModalService } from 'vgr-komponentkartan';
import { UnitService } from './unitService';

@Component({
  selector: 'app-examples-listwithlists',
  templateUrl: './examples-listwithlists.component.html',
  styleUrls: ['./examples-listwithlists.component.scss']

})
export class ExamplesListwithlistsComponent {
  sortDirections = SortDirection;
  items = [];
  listData: ExpandableRow<ExampleUnit, any>[] = [];
  filtertext = '';
  itemSelected = false;
  selectedUnit = '';
  rowToRemove: ExpandableRow<ExampleUnit, any>;
  loading = false;
  noSearchResult = false;

  includeInactiveUnits = false;
  startdate: Date;
  enddate: Date;

  constructor(private changeDetector: ChangeDetectorRef, private unitService: UnitService, public modalService: ModalService) {
    this.includeInactiveUnits = false;
    this.items = Array(3).fill(0).map((x, i) => i);
  }
  get allChecked() {
    if (this.listData.length === 0 || this.listData.every(r => r.previewObject.deleted)) {
      return false;
    }
    return !this.listData.filter(r => !r.previewObject.deleted && this.includeInactiveUnits ? true : r.previewObject.isActive).find(x => !x.previewObject.vald);
  }

  get selectedRows(): ExpandableRow<ExampleUnit, any>[] {
    return this.listData.filter(r => r.previewObject.vald);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  searchForUnits() {
    this.loading = true;
    this.noSearchResult = false;

    this.unitService.getUnits(this.filtertext)
      .subscribe(units => {
        if (units.length > 0) {
          this.mapToListItems(units);
          this.sortlistData('enhet', SortDirection.Ascending);
        } else {
          this.listData = [];
          this.noSearchResult = true;
        }
        this.loading = false;
      });
  }

  private mapToListItems(enheter: ExampleUnit[]) {
    this.listData = enheter.filter(x => !x.deleted).map(x => new ExpandableRow<ExampleUnit, any>(x));
    this.listData.forEach(element => {
      if (this.getRandomInt(0, 5) === 2) {
        element.setNotification('Meddelande om denna rad som ligger permanent', 'vgr-icon-exclamation');
      }
    });
  }

  onListCheckedChanged(event: boolean) {
    if (this.listData) {
      this.listData.filter(r => (!r.previewObject.deleted && this.includeInactiveUnits ? true : r.previewObject.isActive)).forEach(element => element.previewObject.vald = event);
    }
  }

  onSelectRowChanged(row: any, checked: boolean) {
    row.previewObject.vald = checked;
  }

  onSelectedChangedUnit(selectedItem: string) {
    this.itemSelected = true;
  }

  onDeleteRow(row: any) {
    this.removeRow(row);
  }

  removeRow(row: ExpandableRow<ExampleUnit, any>) {
    this.rowToRemove = row;
    this.modalService.openDialog('deleteRowModal');
  }

  getPrintText(): string {
    let result;
    if (this.allChecked) {
      return 'alla enheter';
    } else if (this.selectedRows.length < 10) {
      result = this.selectedRows.map(u => u.previewObject.enhet);
      if (result.length === 1) {
        return result;
      } else {
        return [result.slice(0, -1).join(', '), result.slice(-1)[0]].join(result.length < 2 ? ', ' : ' och ');
      }
    } else {
      return 'valda enheter';
    }
  }

  removeSelectedRow() {
    this.rowToRemove.notifyOnRemove(this.rowToRemove.previewObject.enhet + ' togs bort', 'vgr-icon-ok-check');
    this.rowToRemove.previewObject.vald = false;
    this.rowToRemove.previewObject.deleted = true;
    this.modalService.closeDialog('deleteRowModal');
    console.log('listData', this.listData);
  }

  removeDataFromList(row: ExpandableRow<ExampleUnit, any>) {
    this.listData = this.listData.filter(i => i !== row);
    console.log('listData', this.listData);
  }

  removeSelectedRows() {
    this.selectedRows.forEach(x => {
      x.notifyOnRemove(x.previewObject.enhet + ' togs bort', 'vgr-icon-ok-check');
      x.previewObject.vald = false;
      x.previewObject.deleted = true;
    });
  }

  printSelectedRows() {
    this.listData.forEach(element => element.previewObject.vald = false);
    this.modalService.closeDialog('printModal');
  }


  closeModal(modalId: string) {

    this.modalService.closeDialog(modalId);
  }

  onSortChanged(event: SortChangedArgs) {
    this.sortlistData(event.key, event.direction);
  }

  sortlistData(key: string, direction: SortDirection) {
    this.listData = this.listData.sort((row1, row2) => {
      return row1.previewObject[key] > row2.previewObject[key] ? (direction === SortDirection.Ascending ? 1 : -1) :
        row1.previewObject[key] < row2.previewObject[key] ? (direction === SortDirection.Ascending ? -1 : 1) : 0;
    });
  }
}
