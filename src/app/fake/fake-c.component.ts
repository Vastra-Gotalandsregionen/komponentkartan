import { Component, ViewChildren, QueryList } from '@angular/core';
import { SortDirection, SortChangedArgs } from '../../lib/index';


@Component({
    moduleId: module.id,
    selector: 'vgr-fake-c',
    templateUrl: 'fake-c.component.html'
})
export class FakeCComponent {
    notification: any;
    sortDirections = SortDirection;
    constructor() { }

}
