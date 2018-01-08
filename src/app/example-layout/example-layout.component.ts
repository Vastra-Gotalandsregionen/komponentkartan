import { Component } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'vgr-example-layout',
    templateUrl: 'example-layout.component.html'
})
export class ExampleLayoutComponent {
    constructor() { }

    expanded: boolean;

    onClick() {
        this.expanded = !this.expanded;
    }

    onExpandedChanged(isExpanded: boolean) {
        console.log(isExpanded ? 'expanded' : 'collapsed');
    }
}
