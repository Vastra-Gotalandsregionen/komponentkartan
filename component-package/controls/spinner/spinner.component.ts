import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { trigger, state, style, animation, keyframes, transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'vgr-spinner',
  moduleId: module.id,
  templateUrl: './spinner.component.html',
  styles: [`.spinner {
    width: 60px;
    height: 60px;
    transform: rotate(140deg);
    border: double 10px transparent;
    border-radius: 50%;
    background-image: linear-gradient(white, white), radial-gradient(circle at top left, #f3f3f3, #f3f3f3, #f3f3f3, #0f0f0f);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
  
  .spinner.spinner--large {
    width: 100px;
    height: 100px;
    border: double 15px transparent;
  }
  
  .spinner.spinner--small {
    width: 30px;
    height: 30px;
    border: double 5px transparent;
  }`],
  animations: [trigger('spinning', [
    transition('stopped=>spinning',
      animate('2s', keyframes([
        style({ transform: 'rotate(150deg)', offset: 0 }),
        style({ transform: 'rotate(510deg)', offset: 1 })
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

// import { Component, Input, EventEmitter, Output, HostBinding, OnInit, ElementRef } from '@angular/core'

// @Component({
//     selector: 'vgr-loader',
//     moduleId: module.id,
//     // templateUrl: './loader.component.html',
//     template: `
//     <div class="loader"></div>    
//     `,
//     styles: [`.loader {
//       border: 8px solid #f3f3f3;
//       border-radius: 50%;
//       border-top: 8px solid #99A3AD;
//       width: 60px;
//       height: 60px;
//       -webkit-animation: spin 2s linear infinite;
//       animation: spin 2s linear infinite;      
//     }
    
//     @-webkit-keyframes spin {
//       0% { -webkit-transform: rotate(0deg); }
//       100% { -webkit-transform: rotate(360deg); }
//     }
    
//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
//     `]
// })
// export class LoaderComponent implements OnInit {

//     // @HostBinding('class.validated-input') hasClass = true;
//     // @Input() @HostBinding('class.readonly') readonly?: boolean;
//      @Input() speed = 10;

//     constructor() {
//       this.speed = 100;
//     }

//     ngOnInit() {
//     }
// }
