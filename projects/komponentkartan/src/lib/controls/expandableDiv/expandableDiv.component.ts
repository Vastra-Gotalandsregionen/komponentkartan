import { Input, Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

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
      ),
    ])
  ]
})
export class ExpandableDivComponent {
  @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _expanded = false;

  get expanded(): boolean {
    return this._expanded;
  }

  @Input() set expanded(value: boolean) {
    if (value) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  get stateName() {
    return this._expanded ? 'expanded' : 'collapsed';
  }

  constructor(private elementRef: ElementRef) { }

  animationDone($event) {
    this.elementRef.nativeElement.style['overflow'] = 'visible';
  }
  
  animationStart($event) {
    this.elementRef.nativeElement.style['overflow'] = 'hidden';
  }

  expand() {
    this._expanded = true;
    this.expandedChanged.emit(true);
  }

  collapse() {
    this._expanded = false;
    this.expandedChanged.emit(false);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.preventDefault();
      if (!this._expanded) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  }
}
