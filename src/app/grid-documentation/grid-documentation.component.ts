import { Component, OnInit } from '@angular/core';
import { GridSortDirection, GridSortChangedArgs } from '../../../projects/komponentkartan/src/lib';

export interface DataRow {
  name: string;
  count: number;
  amount: number;
  status: string;
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
      const row = { name: 'Petter' + i, count: 3 + i, amount: 500031 + i, status: 'Klar'};
      this.data.push(row);
    }
  }

  sort(args: GridSortChangedArgs) {
    console.log(args);
  }

}
