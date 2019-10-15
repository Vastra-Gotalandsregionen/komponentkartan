import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageHeaderHeightService {
  private heightSource = new Subject<number>();

  heightChanged = this.heightSource.asObservable();
  height = 0;

  setHeight(height: number) {
    this.height = height;
    this.heightSource.next(height);
  }
}
