import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/animations';

@Component({
    selector: 'vgr-skeleton-loader',
    templateUrl: './skeleton-loader.component.html',
    styleUrls: ['./skeleton-loader.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('true', style({
                opacity: 1
            })),
            state('false', style({
                opacity: 0
            })),
            transition('* => *', animate('400ms ease'))
        ])
    ],
    standalone: false
})
export class SkeletonLoaderComponent {
  private _minimumTimeMs = 1000;
  private lastActivated: Date;
  private _active = false;
  visible = false;

  @Input() set active(value: boolean) {
    if ((this._active && !value) || (!this._active && value)) {
      this._active = value;
      if (!this._active) {
        this.hideWhenMinimumTimeHasPassed();
      } else {
        this.showForMinimumTime();
      }
    }
  }
  get active(): boolean {
    return this._active;
  }

  @Input() width: string = '';
  @Input() height: string = '';
  @Input() circle: boolean = false;


  constructor(private changeDetector: ChangeDetectorRef) { }

  private startSpinning() {
    this.visible = true;
  }
  private stopSpinning() {
    setTimeout(() => {
      if (this._active) {
        this.startSpinning();
      }
    }, 400);
    this.visible = false;
  }
  private hideWhenMinimumTimeHasPassed() {
    const timeShown = new Date().getTime() - this.lastActivated.getTime();
    if (timeShown >= this._minimumTimeMs) {
      this.stopSpinning();
    } else {
      setTimeout(() => {
        this.stopSpinning();
      }, this._minimumTimeMs - timeShown);
    }
  }

  private showForMinimumTime() {
    this.lastActivated = new Date();
    this.startSpinning();
  }


}
