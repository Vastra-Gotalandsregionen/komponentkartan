import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationManagementService {

  navigateAborted = false;
  public subject = new Subject<any>();
  private messageSource = new  BehaviorSubject(this.navigateAborted);
  private currentPage = new Subject<any>();

  changeNavigation = this.messageSource.asObservable();
  pageChanged = this.currentPage.asObservable();

  navigationCancelled(navigated: boolean) {
    this.messageSource.next(navigated);
  }

  tabChangeRequested(page, id) {
    this.currentPage.next({page: page, pageId: id})
  }
}
