import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vgr-grid-content',
    template: '<ng-content></ng-content>',
    standalone: false
})
export class GridContentComponent {

  constructor() { }

}
