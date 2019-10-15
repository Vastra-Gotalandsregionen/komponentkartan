import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'vgr-grid-column',
  templateUrl: './grid-column.component.html'
})
export class GridColumnComponent {

  @Input() @HostBinding('style.flex') width = 1;
  @Input() align = 'left';

}
