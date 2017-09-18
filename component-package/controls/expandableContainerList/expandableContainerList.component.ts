import { Component, HostBinding, ContentChildren, AfterViewInit, QueryList, Input } from '@angular/core';
import { ExpandableContainerComponent } from '../expandableContainer/expandableContainer.component';


@Component({
    templateUrl: './expandableContainerList.component.html',
    moduleId: module.id,
    selector: 'vgr-expandable-container-list'
})
export class ExpandableContainerListComponent implements AfterViewInit {
    @HostBinding('class.expandable-container-list') hasClass = true;
    @ContentChildren(ExpandableContainerComponent) expandableContainers: QueryList<ExpandableContainerComponent> = new QueryList<ExpandableContainerComponent>();
    @Input() allowMultipleExpandedChildren = false;
    constructor() {

    }
    ngAfterViewInit() {
        if (!this.allowMultipleExpandedChildren) {
            this.expandableContainers.forEach(changedContainer => {
                changedContainer.expandedChanged.subscribe((expanded: boolean) => {
                    if (expanded) {
                        this.expandableContainers.filter(container => container !== changedContainer).forEach(otherContainer => otherContainer.collapse());
                    }
                });
            });
        }
    }

}
