import { Component, HostBinding, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { toggleExpandedState } from '../../animation';
@Component({
  selector: 'vgr-table',
  templateUrl: './table.component.html',
  animations: [ toggleExpandedState  ]
})
export class TableComponent {
  @HostBinding('class') tableClass = 'table';
  @Input() expanded = false;
  @Input() expandable = true;
  @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  animationSpeed = '400ms';

  @HostListener('keydown', ['$event']) toggleRow(event: KeyboardEvent) {
    const target = <HTMLDivElement>event.target;
    const targetClass = target.className;
    if (targetClass.includes('table-header') && (['Enter', 'Spacebar', ' '].includes(event.key)) && targetClass.includes('expandable')) { // enter & space
      event.preventDefault();
      event.stopPropagation();
      this.toggleExpansion();
    }
  }

  toggleExpansion(expandable = true) {
    if (expandable) {
      this.expanded = !this.expanded;
      this.expandedChanged.emit(this.expanded);
    }
  }
}

