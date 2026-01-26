import { Component, OnInit, HostBinding, Input, ElementRef, EventEmitter, Output, Host, HostListener, AfterContentInit } from '@angular/core';
import { Guid } from '../../utils/guid';
import { GridSortDirection } from '../sort-arrow/sort-arrow.component';
import { EditableTableService } from './editable-table.service';
@Component({
    selector: 'vgr-editable-table-header-column',
    template: '<ng-content></ng-content>  @if (sortKey && editMode === false) {<vgr-sort-arrow [sortDirection]="sortDirection"></vgr-sort-arrow>}',
    standalone: false
})
export class EditableTableHeaderColumnComponent implements OnInit, AfterContentInit {

  @HostBinding('style.textAlign') @Input() align = 'left';
  @HostBinding('style.width') @Input() width;
  @HostBinding('attr.id') id: string;
  @HostBinding('attr.role') role = 'columnheader';
  @HostBinding('style.cursor') pointer = 'default'


  editMode: boolean = false;
  @Input() sortKey: string;
  @Input() sortDirection = GridSortDirection.None;
  @Output() sortChanged: EventEmitter<GridSortDirection> = new EventEmitter<GridSortDirection>();


  parentId: string;



  constructor(public elem: ElementRef, private editableTableService: EditableTableService) {}

  @HostListener('click', ['$event.target'])
  onClick(target) {
    if (this.sortKey && this.editMode === false) {
      this.changeSort();
    }
  }

  ngOnInit() {
    const uniqeId = Guid.newGuid();
    const index = Array.from(this.elem.nativeElement.parentNode.children).indexOf(this.elem.nativeElement);
    this.id = `${uniqeId}-header-${index}`;

    this.setPointer();

    //check that align value is correct
    if (this.align !== 'left' && this.align !== 'center' && this.align !== 'right') {
      throw new Error('Felaktigt värde på align, endast left, right eller center kan anges ( du har satt ' + this.align + ' ) på kolumn '+ index );
    }
  }

  ngAfterContentInit() {
    this.editableTableService.editmodeChanged.subscribe((value) => {
      if (value.id === this.parentId) {
        this.editMode = value.value;
        this.setPointer();
      }
    });
  }

  setPointer() {
    if (this.sortKey && this.editMode === false) {
      this.pointer = 'pointer'
    } else {
      this.pointer = 'default'
    }
  }
  changeSort() {
    if (this.sortKey) {
      if (this.sortDirection === GridSortDirection.None) {
        this.sortDirection = GridSortDirection.Ascending;
      } else if (this.sortDirection === GridSortDirection.Ascending) {
        this.sortDirection = GridSortDirection.Descending;
      } else if (this.sortDirection === GridSortDirection.Descending) {
        this.sortDirection = GridSortDirection.Ascending;
      }
      this.sortChanged.emit(this.sortDirection);
    }
  }


}
