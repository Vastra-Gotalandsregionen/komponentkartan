import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-selectablelist-column',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SelectablelistColumnComponent {

  @HostBinding('class.right') @Input() alignRight = false;
  @HostBinding('class.center') @Input() alignCenter = false;

  constructor() { }

}
