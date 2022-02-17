import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabManagementService {

  navigateAborted = false;
  public subject = new Subject<any>();
  private messageSource = new  BehaviorSubject(this.navigateAborted);
  private currentTab = new Subject<any>();

  changeNavigation = this.messageSource.asObservable();
  tabChanged = this.currentTab.asObservable();

  navigationCancelled(navigated: boolean) {
    this.messageSource.next(navigated);
  }

  tabChangeRequested(tab) {
    console.log('tabChangeRequested: ', tab.tabId, tab.active)
    this.currentTab.next(tab)
  }

  constructor() { }
}
