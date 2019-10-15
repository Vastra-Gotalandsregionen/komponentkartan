import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private expandRowRequestedSource = new Subject<any>();

  expandRowRequested = this.expandRowRequestedSource.asObservable();

  requestExpandRow(row: any) {
    setTimeout(() => {
      this.expandRowRequestedSource.next(row);
    });
  }
}
