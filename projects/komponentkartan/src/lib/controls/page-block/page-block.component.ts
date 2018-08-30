import { Component, Input } from '@angular/core';

@Component({
    selector: 'vgr-page-block',
    templateUrl: './page-block.component.html'
})
export class PageBlockComponent {

  @Input() transparent = false;

}
