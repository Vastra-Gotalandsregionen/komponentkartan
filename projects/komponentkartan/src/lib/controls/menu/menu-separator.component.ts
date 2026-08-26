import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-menu-separator',
    template: `<span class="menu__item menu-separator"></span>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MenuSeparatorComponent {

    constructor() { }
}
