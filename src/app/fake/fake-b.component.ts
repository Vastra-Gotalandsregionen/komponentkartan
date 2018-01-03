import { Component, ViewChildren, QueryList } from '@angular/core';
import { SortDirection, SortChangedArgs } from '../../lib/index';

@Component({
    moduleId: module.id,
    selector: 'vgr-fake-b',
    templateUrl: 'fake-b.component.html'
})
export class FakeBComponent {
    sortDirections = SortDirection;
    notification: any;

    constructor() {
        this.notification = null;
    }

}
