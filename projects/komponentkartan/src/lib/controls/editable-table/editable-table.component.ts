import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, DebugElement, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { Guid } from '../../utils/guid';
import { Subject } from 'rxjs';
import { EditableTableHeaderComponent } from './editable-table-header.component';
import { EditableTableRowComponent } from './editable-table-row.component';
import { EditableTableService } from './editable-table.service';
import { last, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent implements AfterViewInit, AfterContentInit, OnDestroy {

  @Input() set  editMode(value: boolean){
    this.inEditmode = value;
    this.editableTableService.changeEditmode(value, this.id);
  }
  
  @Input() height = '';


  @ContentChild(EditableTableHeaderComponent) tableHeader: EditableTableHeaderComponent;
  @ContentChildren(EditableTableRowComponent) tableRows: QueryList<EditableTableRowComponent>;
  @ViewChild('tableHeaderContainer') header: ElementRef;

  currentRow: number;
  currentColumn: number;
  inEditmode: boolean = false;
  calculatedHeight: any
  @HostBinding('class.editable-table') editableTableClass = true;
  @HostBinding('attr.id') id: string;
  @HostListener('focusout', ['$event']) onFocus(event) {
    
    if (!this.elRef.nativeElement.contains(event.relatedTarget)) {
      if (this.tableRows.length > 0) {
        this.resetTabIndexOnColumn();
        this.tableRows.get(0).columns.get(0).tabIndex = 0;
      }
      this.currentColumn = 0;
      this.currentRow = 0;
      event.preventDefault();
    } else {
      event.preventDefault();
      event.stopPropagation();

    }
  }
  resetTabIndexOnColumn() {
    if (this.tableRows.length > 0) {
      this.tableRows.get(this.currentRow).columns.get(this.currentColumn).tabIndex = -1;
    }
  }

  setTabIndexAndFocusOnColumn() {
    if (this.tableRows.length > 0) {
      this.tableRows.get(this.currentRow).columns.get(this.currentColumn).tabIndex = 0;
      this.tableRows.get(this.currentRow).columns.get(this.currentColumn).focus();
    }
  }

  @HostListener('keydown', ['$event']) onKeydownHandler(event: any) {

    if (event.key === 'Tab' || (event.shiftKey && event.key === 'Tab')) {
    } else if (event.srcElement.tagName !== 'VGR-EDITABLE-TABLE-COLUMN') {
      return;
    }

    switch (event.key) {

      case 'Tab':
        //tab out of table
        if (event.shiftKey) {
          if (!this.inEditmode) {
            let focusableElements = this.elRef.nativeElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            let firstFocusable = <HTMLElement>focusableElements[0]; //<HTMLElement>
            if (document.activeElement === firstFocusable) {
              return;
            } else {
             event.preventDefault();
             firstFocusable.focus();
  
              //not working...
              firstFocusable.dispatchEvent(new KeyboardEvent('keydown', {'key':'Tab', 'shiftKey': event.shiftKey}));            
            }
          }
        } else {
          if (!this.inEditmode) {
            let focusableElements = this.elRef.nativeElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            let lastFocusable = <HTMLElement>focusableElements[focusableElements.length - 1]; //<HTMLElement>
            if (document.activeElement === lastFocusable) {
              return;
            } else {
             event.preventDefault();
             lastFocusable.focus();
  
              //not working...
             lastFocusable.dispatchEvent(new KeyboardEvent('keydown', {'key':'Tab'}));            
            }
          }
        }
        break;
      case 'ArrowRight':
      case 'Right':
        event.preventDefault();
        this.resetTabIndexOnColumn();

        if (this.currentColumn === this.tableRows.get(this.currentRow).columns.length-1) {
          this.currentColumn = 0;
        } else {
          this.currentColumn++;
        }
        this.setTabIndexAndFocusOnColumn();
        break;
      case 'ArrowLeft':
      case 'Left':
        event.preventDefault();
        this.resetTabIndexOnColumn();
        if (this.currentColumn === 0) {
          this.currentColumn = this.tableRows.get(this.currentRow).columns.length-1;
        } else {
          this.currentColumn--;
        }
        this.setTabIndexAndFocusOnColumn();
        break;
      case 'ArrowUp':
      case 'Up':
        // Only move up and down if we are in table
      

        event.preventDefault();
        this.resetTabIndexOnColumn();
        if (this.currentRow === 0) {
          this.currentRow = this.tableRows.length-1;
        } else {
          this.currentRow--;
        }
        this.setTabIndexAndFocusOnColumn();
        break;
      case 'ArrowDown':
      case 'Down':
        event.preventDefault();
        this.resetTabIndexOnColumn();
        if (this.currentRow === this.tableRows.length-1) {
          this.currentRow = 0;
        } else {
          this.currentRow++;
        }
        this.setTabIndexAndFocusOnColumn();
        break;
      case 'Home':
        event.preventDefault();
        if (event.ctrlKey) {
          this.resetTabIndexOnColumn();
          this.currentColumn = 0;
          this.currentRow = 0;

          this.setTabIndexAndFocusOnColumn();
        } else {
          this.resetTabIndexOnColumn();
          this.currentColumn = 0;

          this.setTabIndexAndFocusOnColumn();
        }
        break;
      case 'End':
        event.preventDefault();
        if (event.ctrlKey) {
          this.resetTabIndexOnColumn();

          this.currentColumn = this.tableRows.get(this.tableRows.length-1).columns.length-1;
          this.currentRow = this.tableRows.length-1;

          this.setTabIndexAndFocusOnColumn();
        } else {
          this.resetTabIndexOnColumn();
          this.currentColumn = this.tableRows.get(this.currentRow).columns.length-1;
          this.setTabIndexAndFocusOnColumn();
        }
        break;
    }
  }

  @HostListener('window:resize') setColumnWidths() {
    const el = this.elRef.nativeElement;
    const row = el.querySelector('vgr-editable-table-row');
    if (row) {
      const rowColumns = Array.from(row.querySelectorAll('vgr-editable-table-column'));

      const headerColumns = Array.from(el.querySelectorAll('vgr-editable-table-header-column'));

      const headerColumnWidth = this.tableHeader.headerColumns.map(element => element.width);
      headerColumns.pop(); // dont want to set a size on the last column that can brake the alignments
      headerColumns.forEach((element: HTMLElement, index) => {
        element.style.width = this.tableHeader.headerColumns.get(index).width;
      });

      rowColumns.forEach((column: HTMLElement, index) => {
        column.style.width = headerColumnWidth[index];
      })

       this.calculateTableHeight();
    }
  }

  constructor(public elRef: ElementRef, private editableTableService: EditableTableService) {
    const uniqeId = Guid.newGuid();
    // const index = Array.from(this.elRef.nativeElement.parentNode.children).indexOf(this.elRef.nativeElement);
    this.id = `${uniqeId}`;
  }

  private ngUnsubscribe = new Subject();
  ngAfterViewInit() {
    setTimeout(() => this.setColumnWidths(), 100);

  }


  calculateTableHeight() {
    let newHeight: any;
    if (this.height === '') {
      return;
    } else if (this.height.includes('px')) {
      const numericHeight = +this.height.replace('px', '');

      newHeight = numericHeight-this.header.nativeElement.offsetHeight;
      this.calculatedHeight = newHeight + 'px'
    } else {

      console.log('height är felaktigt satt!')
    }

  }

  ngAfterContentInit() {
    this.tableRows.forEach(row => row.parentId = this.id);
    this.tableHeader.headerColumns.forEach(column => column.parentId = this.id)

    this.tableRows.changes.pipe(takeUntil(this.ngUnsubscribe)).subscribe((rows) => {
      setTimeout(() => {
        const el = this.elRef.nativeElement;
        const row = el.querySelector('vgr-editable-table-row');
        if (row) {
          const rowColumns = Array.from(row.querySelectorAll('vgr-editable-table-column'));
          const headerColumnWidth = this.tableHeader.headerColumns.map(element => element.width);
          rowColumns.forEach((column: HTMLElement, index) => {
            column.style.width = headerColumnWidth[index];
          })

          this.setAlignment();
          rows.get(rows.length-1).editMode = this.inEditmode;
        }

      });


    });


    if (this.tableRows.length > 0) {
     setTimeout(() => {
      this.tableRows.get(0).columns.get(0).tabIndex = 0; 
      this.tableRows.get(0).editMode = this.inEditmode;
     });
    }

    this.currentColumn = 0;
    this.currentRow = 0;

    setTimeout(() => {
      this.setAlignment();  
    });
  }


  setAlignment() {
    this.tableRows.forEach((row) => {
      for (let i = 0; i < row.columns.length; i++) {
        row.columns.get(i).align = this.tableHeader.headerColumns.get(i).align;
        row.columns.get(i).headerId = this.tableHeader.headerColumns.get(i).id;
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
