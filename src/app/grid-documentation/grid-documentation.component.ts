import { Component, OnInit } from '@angular/core';
import { GridSortDirection, GridSortChangedArgs } from '../../../projects/komponentkartan/src/lib';

export interface DataRow {
  name: string;
  count: number;
  amount: number;
  status: string;
  expanded: boolean;
  checked: boolean;
  comment: string;
}
@Component({
  selector: 'vgr-grid-documentation',
  templateUrl: './grid-documentation.component.html',
  styleUrls: ['./grid-documentation.component.css']
})
export class GridDocumentationComponent implements OnInit {
  data: DataRow[] = [];
  paginatedData: DataRow[] = [];
  pageCount = 1;
  activePage = 1;
  showLoader = true;
  disableAnimation = false;
  filterOn = false;
  private itemsPerPage = 30;

  constructor() { }

  ngOnInit() {

    for (let i = 0; i < 100; i++) {
      const row = {
        name: 'Petter ' + i, count: 3 + i, amount: 500031 + i, status: 'Klar', comment: (i % 2 === 0) ? 'Min kommentar ' + (i) : null,
        expanded: false, checked: false,
      };
      this.data.push(row);
    }
    this.showLoader = false;

    this.pageCount = Math.ceil(this.data.length / this.itemsPerPage);
    this.setPagingData(this.activePage);
  }

  onPageChanged(page: number) {
    this.setPagingData(page);
  }

  setPagingData(page: number) {
    this.activePage = page;
    const rows = this.data.filter(row => {
      if (this.filterOn && row.amount < 500100) {
        return false;
      } else {
        return true;
      }
    });
    this.pageCount = Math.ceil(rows.length / this.itemsPerPage);
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.paginatedData = rows.slice(start, end);
    this.disableAnimation = true;


    // setTimeout(() => {
    //   this.showLoader1 = false;
    // }, 1000);
  }

  remove() {
    const rows4removal = this.data.filter(row => row.checked);
    rows4removal.forEach((x) => {
      const dateindex = this.data.indexOf(x);
      this.data.splice(dateindex, 1);
      const index = this.paginatedData.indexOf(x);
      this.paginatedData.splice(index, 1);
    });

    this.pageCount = Math.ceil(this.data.length / this.itemsPerPage);
    this.setPagingData(this.activePage);
    // if (this.activePage > this.pageCount) {
    //   this.setPagingData(this.pageCount);
    // }
  }

  toggleChecked(row: DataRow) {
    row.checked = !row.checked;
  }

  setAllChecked(checked: boolean) {
    this.paginatedData.forEach(x => x.checked = checked);
  }

  sort(args: GridSortChangedArgs) {
    this.data = this.data.sort((row1, row2) => {
      return row1[args.key] > row2[args.key] ? (args.direction === GridSortDirection.Ascending ? 1 : -1) :
        row1[args.key] < row2[args.key] ? (args.direction === GridSortDirection.Ascending ? -1 : 1) : 0;
    });
  }

  setFilter(event: boolean) {
    this.filterOn = event;
    this.setPagingData(1);
  }

  get anyIsChecked(): boolean {
    return this.paginatedData.some(x => x.checked === true);
  }

  get allChecked(): boolean {
    if (this.paginatedData.length > 0) {
      return this.paginatedData.every(x => x.checked);
    }
    return false;
  }
}
