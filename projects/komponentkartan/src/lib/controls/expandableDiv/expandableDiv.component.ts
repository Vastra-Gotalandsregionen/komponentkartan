import { Input, Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { toggleExpandedState, toggleChevron } from '../../animation';

@Component({
    selector: 'vgr-expandable-div',
    templateUrl: './expandableDiv.component.html',
    styleUrls: ['./expandableDiv.component.scss'],
    animations: [toggleExpandedState, toggleChevron],
    standalone: false
})
export class ExpandableDivComponent {
  @Input() expanded = false;
  @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('header', { static: false }) header: ElementRef;

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

  public focus() {
    if (this.header) {
      this.header.nativeElement.focus();
    }
  }
}
