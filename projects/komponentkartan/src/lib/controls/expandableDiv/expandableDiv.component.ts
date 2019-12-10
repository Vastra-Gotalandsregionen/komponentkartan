import { Input, Component, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { trigger, style, transition, animate, state, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'vgr-expandable-div',
  templateUrl: './expandableDiv.component.html',
  animations: [
    trigger('slideExpandableContent', [
      state('collapsed', style({
        overflow: 'hidden',
        height: '0'
      })),
      state('expanded', style({
        overflow: 'visible',
        height: '*',
      })),
      transition('expanded => collapsed',
        animate('400ms ease-out')
      ),
      transition('collapsed => expanded',
        animate('400ms ease-in')
      )
    ])
  ]
})
export class ExpandableDivComponent implements OnChanges {
  @Input() expanded = false;
  @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('content', { static: true }) content: ElementRef;
  stateName = 'collapsed';

  ngOnChanges(changes: SimpleChanges) {
    const expandedChange = changes['expanded'];
    if (expandedChange) {
      this.stateName = this.expanded ? 'expanded' : 'collapsed';
    }
  }

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

  constructor() { }

  animationStart(event: AnimationEvent) {
    if (event.toState === 'collapsed') {
      this.content.nativeElement.style['overflow'] = 'hidden';
    }
  }

  animationDone(event: AnimationEvent) {
    if (event.toState === 'expanded') {
      this.content.nativeElement.style['overflow'] = 'visible';
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
    this.stateName = 'collapsed';
    this.expandedChanged.emit(this.expanded);
  }

  expand() {
    this.expanded = true;
    this.stateName = 'expanded';
    this.expandedChanged.emit(this.expanded);
  }
}

