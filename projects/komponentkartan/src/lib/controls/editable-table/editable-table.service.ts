import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditableTableService {
  private editmode = new Subject<any>();
  constructor() { }

  editmodeChanged = this.editmode.asObservable();

  changeEditmode(value: boolean, id: any) {
    this.editmode.next({ value: value, id: id });
  }
}
