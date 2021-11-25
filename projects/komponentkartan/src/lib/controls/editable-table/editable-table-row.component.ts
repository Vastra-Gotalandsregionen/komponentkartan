import { Component, ElementRef, QueryList, ContentChildren, AfterContentInit, Input } from '@angular/core';
import { EditableTableColumnComponent } from './editable-table-column.component';
import { EditableTableService } from './editable-table.service';

@Component({
  selector: 'vgr-editable-table-row',
  template: '<ng-content selects="vgr-editable-table-column"></ng-content>'
})
export class EditableTableRowComponent implements AfterContentInit {
  @ContentChildren(EditableTableColumnComponent) columns : QueryList<EditableTableColumnComponent>;
  @Input() parentId: string;
  constructor(public elem: ElementRef, private editableTableService: EditableTableService) {
  }

  ngAfterContentInit() {
    this.editableTableService.editmodeChanged.subscribe((value) => {
      if (value.id === this.parentId) {
        this.columns.forEach((column) => column.editMode = value.value );
      }
    });
  }
}
