import { Component, HostBinding, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
@Component({
  selector: 'vgr-table',
  templateUrl: './table.component.html',
  animations: [
    trigger('toggleState', [
      state('*', style({
        height: '0',
        display: 'none'
      })),
      state('true', style({
        height: '*',
        display: 'block'
      })),
      state('false', style({
        height: 0,
        display: 'none'
      })),
      transition('false <=> true', [
        animate('0.4s ease')
      ])
    ])
  ]
})
export class TableComponent {
  @HostBinding('class') tableClass = 'table';
  @Input() expanded = false;
  @Input() expandable = true;
  @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('keydown', ['$event']) toggleRow(event: KeyboardEvent) {
    const target = <HTMLDivElement>event.target;
    const targetClass = target.className;
    if (targetClass.includes('table-header') && (event.keyCode === 13 || event.keyCode === 32) && targetClass.includes('expandable')) { // enter & space
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

