import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private expandRowRequestedSource = new Subject<any>();
  expandRowRequested = this.expandRowRequestedSource.asObservable();

  private collapseRowRequestedSource = new Subject<any>();
  collapseRowRequested = this.collapseRowRequestedSource.asObservable();

  requestExpandRow(row: any) {
    setTimeout(() => {
      this.expandRowRequestedSource.next(row);
    },0);
  }

  requestCollapseRow(row: any) {
    setTimeout(() => {
      this.collapseRowRequestedSource.next(row);
    });
  }
}
