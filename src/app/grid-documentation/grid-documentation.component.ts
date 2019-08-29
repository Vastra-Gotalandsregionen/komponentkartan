import { Component, OnInit } from '@angular/core';
import { GridSortDirection, GridSortChangedArgs } from '../../../projects/komponentkartan/src/lib';

export interface DataRow {
  name: string;
  count: number;
  amount: number;
  status: string;
  expanded: boolean;
}
@Component({
  selector: 'vgr-grid-documentation',
  templateUrl: './grid-documentation.component.html',
  styleUrls: ['./grid-documentation.component.css']
})
export class GridDocumentationComponent implements OnInit {
  data: DataRow[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      const row = { name: 'Petter' + i, count: 3 + i, amount: 500031 + i, status: 'Klar', expanded: false };
      this.data.push(row);
    }
  }

  sort(args: GridSortChangedArgs) {
    this.data = this.data.sort((row1, row2) => {
      return row1[args.key] > row2[args.key] ? (args.direction === GridSortDirection.Ascending ? 1 : -1) :
        row1[args.key] < row2[args.key] ? (args.direction === GridSortDirection.Ascending ? -1 : 1) : 0;
    });
  }

  onExpandedChanged(row: DataRow, event: boolean) {
    row.expanded = event;
  }

}
