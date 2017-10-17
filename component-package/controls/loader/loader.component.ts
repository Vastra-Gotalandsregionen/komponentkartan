import { Component, Input, ChangeDetectorRef, HostBinding } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'vgr-loader',
  moduleId: module.id,
  templateUrl: './loader.component.html'
})
export class LoaderComponent {
  private _minimumTimeMs = 1000;
  private lastActivated: Date;
  private _active = false;

  @HostBinding('class.loader--visible') visible = false;
  @HostBinding('class.loader--spinning') spinning = false;

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

  @Input() small: boolean;


  constructor(private changeDetector: ChangeDetectorRef) { }

  private startSpinning() {
    this.spinning = true;
    this.visible = true;
  }
  private stopSpinning() {
    setTimeout(() => {
      if (this._active) {
        this.startSpinning();
      } else {
        this.spinning = false;
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
