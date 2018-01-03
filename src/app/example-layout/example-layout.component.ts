import { Component, ViewChildren, QueryList } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'vgr-example-layout',
    templateUrl: 'example-layout.component.html'
})
export class ExampleLayoutComponent {
    expanded: boolean;
    constructor() { }

    onClick() {
        this.expanded = !this.expanded;

    }
}
