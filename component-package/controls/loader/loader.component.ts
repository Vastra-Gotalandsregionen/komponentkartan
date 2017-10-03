import { Component, Input, EventEmitter, Output, HostBinding, OnInit, ElementRef } from '@angular/core'

@Component({
    selector: 'vgr-loader',
    moduleId: module.id,
    // templateUrl: './loader.component.html',
    template: `
    <div class="loader"></div>    
    `,
    styles: [`.loader {
      border: 8px solid #f3f3f3;
      border-radius: 50%;
      border-top: 8px solid #99A3AD;
      width: 60px;
      height: 60px;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;      
    }
    
    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    `]
})
export class LoaderComponent implements OnInit {

    // @HostBinding('class.validated-input') hasClass = true;
    // @Input() @HostBinding('class.readonly') readonly?: boolean;
     @Input() speed = 10;

    constructor() {
      this.speed = 100;
    }

    ngOnInit() {
    }
}
