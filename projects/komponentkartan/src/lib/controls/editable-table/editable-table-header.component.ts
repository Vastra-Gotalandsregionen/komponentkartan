import { Component, ContentChildren, QueryList } from '@angular/core';
import { EditableTableHeaderColumnComponent } from './editable-table-header-column.component';

@Component({
  selector: 'vgr-editable-table-header',
  template: '<ng-content select="vgr-editable-table-header-column"></ng-content>'
})
export class EditableTableHeaderComponent {

  @ContentChildren(EditableTableHeaderColumnComponent) headerColumns: QueryList<EditableTableHeaderColumnComponent>;
  constructor() { }

}
