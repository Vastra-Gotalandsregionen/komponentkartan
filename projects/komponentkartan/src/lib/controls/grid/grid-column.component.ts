import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-grid-column',
    templateUrl: './grid-column.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class GridColumnComponent {

  @Input() @HostBinding('style.flex') width = 1;
  @Input() align = 'left';

}
