import { Input, Component, Output, EventEmitter } from '@angular/core';
import { toggleExpandedState, toggleChevron } from '../../animation';

@Component({
  selector: 'vgr-expandable-div',
  templateUrl: './expandableDiv.component.html',
  animations: [toggleExpandedState, toggleChevron]
})
export class ExpandableDivComponent{
  @Input() expanded = false;
  @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Spacebar' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      if (!this.expanded) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  }

  toggleExpanded() {
    if (this.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  collapse() {
    this.expanded = false;
    this.expandedChanged.emit(this.expanded);
  }

  expand() {
    this.expanded = true;
    this.expandedChanged.emit(this.expanded);
  }
}
