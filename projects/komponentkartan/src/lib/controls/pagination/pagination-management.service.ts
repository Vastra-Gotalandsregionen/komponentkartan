import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationManagementService {

  navigateAborted = false;
  public subject = new Subject<any>();
  private messageSource = new  BehaviorSubject(this.navigateAborted);

  changeNavigation = this.messageSource.asObservable();

  navigationCancelled(navigated: boolean) {
    this.messageSource.next(navigated);
  }
}
