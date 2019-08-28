import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageHeaderHeightService {
  private heightSource = new Subject<number>();

  height = this.heightSource.asObservable();

  setHeight(height: number) {
      this.heightSource.next(height);
  }
}
