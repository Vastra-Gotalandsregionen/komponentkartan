import { Input, Component, HostBinding, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
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
      state('void', style({
        overflow: 'hidden',
        height: '0'
      })),
      transition('expanded => collapsed',
        animate('400ms ease-out')
      ),
      transition('collapsed => expanded',
        animate('400ms ease-in')
      ),
      transition('void => expanded',
        animate('400ms ease-in')
      )
    ])
  ]
})
export class ExpandableDivComponent {
  @HostBinding('class.expandable-div--collapsed') collapsed = true;
  @HostBinding('class.expandable-div--expanded') _expanded = false;
  @HostBinding('class.expandable-div') expandableDivClass = true;
  @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('keydown', ['$event']) toggleRow(event: KeyboardEvent) {
    const target = <HTMLDivElement>event.target;
    const targetClass = target.className;
    if (targetClass === 'expandable-div-header' && (event.keyCode === 13 || event.keyCode === 32)) { // enter & space
      event.preventDefault();
      event.stopPropagation();
      if (!this._expanded) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  }

  @Input() set expanded(expandedValue: boolean) {
    if (expandedValue && !this._expanded) {
      this.expand();
    } else if (!expandedValue && this._expanded) {
      this.collapse();
    }
  }

  get expanded(): boolean {
    return this._expanded;
  }

  get chevron_class() {
    return this.expanded ? 'expanded' : 'collapsed';
  }

  get stateName() {
    return this.expanded ? 'expanded' : 'collapsed';
  }


  constructor(private elementRef: ElementRef) { }

  animationStart(event: AnimationEvent) {
    if (event.toState === 'collapsed') {
      this.elementRef.nativeElement.style['overflow'] = 'hidden';
    }
  }

  animationDone(event: AnimationEvent) {
    if (event.toState === 'expanded') {
      this.elementRef.nativeElement.style['overflow'] = 'visible';
    }
  }

  collapse() {
    const expandedChanged = this._expanded;
    this._expanded = false;
    this.collapsed = true;
    if (expandedChanged) {
      this.expandedChanged.emit(this._expanded);
    }
  }

  expand() {
    const expandedChanged = !this._expanded;
    this._expanded = true;
    this.collapsed = false;
    if (expandedChanged) {
      this.expandedChanged.emit(this._expanded);
    }
  }
}

