import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private expandListItemRequestedSource = new Subject<any>();

  expandListItemRequested = this.expandListItemRequestedSource.asObservable();

  constructor() { }

  requestExpandListItem(listItem: any) {
    setTimeout(() => {
      this.expandListItemRequestedSource.next(listItem);
    });
  }

}
