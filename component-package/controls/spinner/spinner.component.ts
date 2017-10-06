import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { trigger, state, style, animation, keyframes, transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'vgr-spinner',
  moduleId: module.id,
  templateUrl: './spinner.component.html',
  animations: [trigger('spinning', [
    transition('stopped=>spinning',
      animate('2s', keyframes([
        style({ transform: 'rotate(-45deg)', offset: 0 }),
        style({ transform: 'rotate(315deg)', offset: 1 })
      ])))
  ])]
})
export class SpinnerComponent implements OnInit {
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

  @Input() size: string;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.size);
  }

  rotationDone() {
    this.rotationInProgress = false;
    this.changeDetector.detectChanges();
    if (this._spinning) {
      this.rotationInProgress = true;
    }
  }
}