import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-page-block',
    templateUrl: './page-block.component.html',
    styleUrls: ['./page-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PageBlockComponent {

  @Input() transparent = false;

}
