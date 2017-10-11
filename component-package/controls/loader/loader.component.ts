import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { trigger, state, style, animation, keyframes, transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'vgr-loader',
  moduleId: module.id,
  templateUrl: './loader.component.html',
  animations: [trigger('spinning', [
    transition('stopped=>spinning',
      animate('1.2s linear', keyframes([
        style({ transform: 'rotate(-45deg)', offset: 0 }),
        style({ transform: 'rotate(315deg)', offset: 1 })
      ])))
  ])]
})
export class LoaderComponent {
  private _spinning: boolean;
  private spinningState = 'stopped';
  get rotationInProgress(): boolean {
    return this.spinningState === 'spinning';
  }
  set rotationInProgress(value: boolean) {
    this.spinningState = value ? 'spinning' : 'stopped';
  }
  @Input() set spinning(value: boolean) {
    this._spinning = value;
    if (value) {
      this.rotationInProgress = true;
    }
  }
  get spinning(): boolean {
    return this._spinning;
  }

  @Input() small: boolean;

  constructor(private changeDetector: ChangeDetectorRef) { }

  rotationDone() {
    this.rotationInProgress = false;
    this.changeDetector.detectChanges();
    if (this._spinning) {
      this.rotationInProgress = true;
    }
  }
}
