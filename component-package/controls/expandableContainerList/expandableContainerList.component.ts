import { Component, HostBinding } from '@angular/core';


@Component({
    templateUrl: './expandableContainerList.component.html',
    moduleId: module.id,
    selector: 'vgr-expandable-container-list'
})
export class ExpandableContainerListComponent {
    @HostBinding('class.expandable-container-list') hasClass = true;
}
