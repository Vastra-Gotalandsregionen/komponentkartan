import { Component, ViewChildren, QueryList } from '@angular/core';
import { SortDirection, } from '../../component-package/controls/list/list-column-header.component';
import { SortChangedArgs } from '../../component-package/controls/list/list-header.component';

@Component({
    moduleId: module.id,
    selector: 'vgr-fake-b',
    templateUrl: 'fake-b.component.html'
})
export class FakeBComponent {
    sortDirections = SortDirection;

    constructor() { }

}
