import { Component, HostBinding, Output, EventEmitter, HostListener, Input, ElementRef, ViewChild } from '@angular/core';
import { toggleExpandedState } from '../../animation';
@Component({
    selector: 'vgr-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    animations: [toggleExpandedState],
    standalone: false
})
export class TableComponent {
  @HostBinding('class') tableClass = 'table';
  @Input() expanded = false;
  @Input() expandable = true;
  @Input() percentLayout: boolean = false;
  @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('table', { read: ElementRef, static: false }) table: ElementRef;
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

  public focus() {
    this.table.nativeElement.focus();
  }
}

