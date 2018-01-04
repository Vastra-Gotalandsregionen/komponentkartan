import { Component, ViewChildren, QueryList } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'vgr-example-layout',
    templateUrl: 'example-layout.component.html'
})
export class ExampleLayoutComponent {
    expanded: boolean;
    chevron_class = 'chevron-collapsed';

    constructor() { }

    onClick() {
        this.expanded = !this.expanded;
    }

    toggleClass() {
        if (this.chevron_class === 'chevron-collapsed') {
            this.chevron_class = 'chevron-expanded';
        } else {
            this.chevron_class = 'chevron-collapsed';
        }
    }
}
