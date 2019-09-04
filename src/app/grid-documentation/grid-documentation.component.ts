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
  data1: DataRow[] = [];
  data2: DataRow[] = [];
  paginatedData1: DataRow[] = [];
  pageCount = 1;
  activePage = 1;
  showLoader1 = true;
  private itemsPerPage = 3;

  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        const row = {
          name: 'Petter ' + i, count: 3 + i, amount: 500031 + i, status: 'Klar', comment: (i % 2 === 0) ? 'Min kommentar ' + (i) : null,
          expanded: false, checked: false,
        };
        this.data1.push(row);
      }
      this.showLoader1 = false;

      this.pageCount = Math.ceil(this.data1.length / this.itemsPerPage);
      this.setPagingData(this.activePage);

    }, 400);

    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        const row = {
          name: 'Lisa ' + i, count: 3 + i, amount: 500031 + i, status: 'Klar', comment: (i > 5) ? 'Min kommentar ' + 500031 + i : null,
          expanded: false, checked: false
        };
        this.data2.push(row);
      }
    }, 1000);

  }

  sort1(args: GridSortChangedArgs) {
    this.data1 = this.data1.sort((row1, row2) => {
      return row1[args.key] > row2[args.key] ? (args.direction === GridSortDirection.Ascending ? 1 : -1) :
        row1[args.key] < row2[args.key] ? (args.direction === GridSortDirection.Ascending ? -1 : 1) : 0;
    });
  }

  sort2(args: GridSortChangedArgs) {
    this.data2 = this.data2.sort((row1, row2) => {
      return row1[args.key] > row2[args.key] ? (args.direction === GridSortDirection.Ascending ? 1 : -1) :
        row1[args.key] < row2[args.key] ? (args.direction === GridSortDirection.Ascending ? -1 : 1) : 0;
    });
  }

  toggleChecked(row: DataRow) {
    row.checked = !row.checked;
  }

  remove() {
    const rows4removal = this.data1.filter(row => row.checked);
    rows4removal.forEach((x) => {
      const index = this.data1.indexOf(x);
      this.data1.splice(index, 1);
    });
    this.pageCount = Math.ceil(this.data1.length / this.itemsPerPage);
    this.setPagingData(this.activePage);
  }

  setAllChecked(checked: boolean) {
    this.data1.forEach(x => x.checked = checked);
  }

  onPageChanged(page: number) {
    this.showLoader1 = true;
    this.setPagingData(page);
  }

  setPagingData(page: number) {
    this.activePage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData1 = this.data1.slice(start, end);
    setTimeout(() => {
      this.showLoader1 = false;
    }, 300);
  }

  get anyIsChecked(): boolean {
    return this.data1.some(x => x.checked === true);
  }

  get allChecked(): boolean {
    if (this.data1.length > 0) {
      return this.data1.every(x => x.checked);
    }
    return false;
  }
}
