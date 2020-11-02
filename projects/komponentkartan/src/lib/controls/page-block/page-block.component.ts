import { Component, Input } from '@angular/core';

@Component({
    selector: 'vgr-page-block',
    templateUrl: './page-block.component.html',
    styleUrls: ['./page-block.component.scss']
})
export class PageBlockComponent {

  @Input() transparent = false;

}
