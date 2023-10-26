import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectablelistService {

  private clickedRowRequestedSource = new Subject<any>();
  private clickedHeaderRequestedSource = new Subject<any>();

  clickedRowRequested = this.clickedRowRequestedSource.asObservable();
  clickedHeaderRequested = this.clickedHeaderRequestedSource.asObservable();

  requestRowClicked(row: any) {
    setTimeout(() => {
      this.clickedRowRequestedSource.next(row);
    });
  }

  headerClicked(header: any) {
    setTimeout(() => {
      this.clickedHeaderRequestedSource.next(header);
    });
  }
}

