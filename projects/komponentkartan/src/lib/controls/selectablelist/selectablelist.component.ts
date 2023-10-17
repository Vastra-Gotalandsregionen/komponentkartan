import {
  Component,
  ElementRef,
  AfterContentInit,
  HostListener,
  ContentChildren,
  QueryList,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy,
  HostBinding,
  ViewChild,
  ContentChild
} from '@angular/core';
import { SelectablelistHeaderComponent } from './selectablelist.header.component';
import { SelectablelistRowComponent } from './selectablelist.row.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectablelistService } from './selectablelist.service';
import { GridSortDirection } from '../sort-arrow/sort-arrow.component';
import { ScrollbarComponent } from '../scrollbar/scrollbar.component';

@Component({
  selector: 'vgr-selectablelist',
  templateUrl: './selectablelist.component.html',
  styleUrls: ['./selectablelist.component.scss']
})
export class SelectablelistComponent implements AfterContentInit, OnChanges, OnDestroy {

  headersPresent: boolean;
  controlPressed = false;
  focusedRow: number = null;

  sortOption: { column: number; sortDirection: GridSortDirection } = {
    column: null,
    sortDirection: GridSortDirection.None,
  };
  sortDirection = GridSortDirection;

  @HostBinding('attr.aria-activedescendant') activeDecendant = null;
  @HostBinding('attr.role') role = 'listbox';
  @HostBinding('attr.aria-multiselectable') multi = true;
  @HostBinding('attr.tabIndex') tabIndex = 0;

  @Input() active: boolean;
  @Input() useScrollbar: boolean = true;
  @HostBinding('attr.id') @Input() id: string;
  @Output() selectionChanged = new EventEmitter();

  @ContentChild(SelectablelistHeaderComponent) header: SelectablelistHeaderComponent;

  @ContentChildren(SelectablelistRowComponent) rows: QueryList<SelectablelistRowComponent>;

  @ViewChild('scrollWrapper') scrollWrapper;

  private ngUnsubscribe = new Subject();

  lastSelectedItemIndex: number;
  isClicked: boolean;

  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.isClicked = false;
    if (event.repeat) { return; }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Up' || event.key === 'Down') {
      event.preventDefault();
      let newIndex: number;
      if (event.key === 'ArrowDown' || event.key === 'Down') {
        newIndex = this.focusedRow < this.rows.length - 1 ? this.focusedRow + 1 : 0;
      } else {
        newIndex = this.focusedRow > 0 ? this.focusedRow - 1 : this.rows.length - 1;
      }
      this.focusRow(newIndex);
    } else if (event.key === ' ') {
      event.preventDefault();
      this.changeActiveStatus(this.focusedRow);
    }
  }

  @HostListener('click', ['$event']) onClick(event) {
    this.isClicked = true;
  }

  @HostListener('focusin', ['$event']) onCompFocus(event) {

    if (this.isClicked) {
      // do nothing
      this.isClicked = false;
    } else {
      const selectedRows = this.rows.filter(r => r.selected === true);
      if (selectedRows) {
        this.focusedRow = this.rows.toArray().indexOf(selectedRows[0])
        this.focusRow(this.focusedRow);
      } else {
        this.selectFirstSelectable()
      }
    }
  }

  @HostListener('focusout', ['$event']) onCompBlur(event) {
    const rows = this.rows.toArray();
    rows.forEach(row => { row.focused = false; });
    // this.focusedRow = null;
    this.activeDecendant = null;
  }

  @HostListener('window:resize') alignColumns() {
    const el = this.elRef.nativeElement;
    const row = el.querySelector('vgr-selectablelist-row');
    if (row) {
      const rowWidths = Array.from(row.querySelectorAll('vgr-selectablelist-column'))
        .map((item: HTMLElement) => item.clientWidth);

      const headers = Array.from(el.querySelectorAll('vgr-selectablelist-header-column'));
      headers.pop(); // dont want to set a size on the last column that can brake the alignments
      headers.forEach((element: HTMLElement, index) => {
        element.style.width = rowWidths[index] + 'px';
      });

      setTimeout(() => this.setInternalIds(), 0);
    }
  }

  constructor(public elRef: ElementRef, private selectablelistService: SelectablelistService) {}

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.active || this.rows === undefined) {
      return;
    }

    if (changes.active.firstChange === true) {
      this.selectFirstSelectable();
    }

    if (changes.active.currentValue === true && changes.active.previousValue === false) {
      if (this.lastSelectedItemIndex !== undefined) {
        this.changeActiveStatus(this.lastSelectedItemIndex, false)
      }
    }

    if (changes.active.currentValue === false) {
      this.clearSelection();
      this.selectionChanged.emit([]);
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if (this.scrollWrapper.nativeElement.clientHeight < 244) {
        this.useScrollbar = false;
      }
    }, 20);
    setTimeout(() => this.alignColumns(), 100);
    if (this.header) {
      this.headersPresent = true;
    }

    this.rows.changes.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      setTimeout(() => this.alignColumns(), 100);
    });

    this.selectablelistService.clickedRowRequested
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((row: SelectablelistRowComponent) => {
          this.handleRowClicked(row);
        });

    if (this.active) {
      setTimeout(() => {
        this.selectFirstSelectable();
      }, 200);
    }

    // We don't want a tabstop on the scrollbar.
    setTimeout(() => {
      const scrollbar = this.elRef.nativeElement.querySelector('.ps__thumb-y');
      if (scrollbar) {
        scrollbar.tabIndex = -1;
      }
    }, 300);
  }

  // sortColumn(clickedHeader: SelectablelistHeaderColumnComponent) {
  //   const subIndex = clickedHeader.id.lastIndexOf('-') + 1;
  //   const index = +clickedHeader.id.substring(subIndex);
  //   const rowValues = this.rows.toArray();

  //   this.sortOption.sortDirection =
  //     this.sortOption.sortDirection === GridSortDirection.Ascending &&
  //     this.sortOption.column === index
  //       ? GridSortDirection.Descending
  //       : GridSortDirection.Ascending;
  //   this.sortOption.column = index;


  //   console.log('here')
  //   rowValues.sort((a, b) => {
  //   const aElement = a.elem.nativeElement;
  //   const bElement = b.elem.nativeElement;
  //   const aIndex: any = (aElement.children[index] as HTMLElement).innerText.replace(/\s/g, '').replace(',', '.');
  //   const bIndex: any = (bElement.children[index] as HTMLElement).innerText.replace(/\s/g, '').replace(',', '.');
  //   const valA = isNaN(aIndex) ? aIndex : parseFloat(aIndex);
  //   const valB = isNaN(bIndex) ? bIndex : parseFloat(bIndex);
  //   return valA > valB ? 1 : valB > valA ? -1 : 0;
  // });

  // if (this.sortOption.sortDirection === GridSortDirection.Descending) {
  //   rowValues.reverse();
  // }

  // this.rows.reset(rowValues);

  //  this.rows = new  QueryList<SelectablelistRowComponent>();
  // this.rows.notifyOnChanges();
  // console.log('in sort: ', this.rows)

  // }


  handleRowClicked(row: SelectablelistRowComponent) {
    const index = this.rows.toArray().indexOf(row);
    this.changeActiveStatus(index);

  }

  setInternalIds() {
    this.rows.forEach((row, index) => {
      row.id = `${this.id}-row${index}`;
    });
  }

  clearSelection() {
    const lastSelectedItem = this.rows?.filter(x => x.selected === true)[0];
    this.lastSelectedItemIndex = this.rows.toArray().indexOf(lastSelectedItem)
    this.rows?.forEach(row => { row.selected = false; row.focused = false; });
  }

  selectFirstSelectable() {
    const rows = this.rows.toArray();

    const firstNonHeader = this.rows.filter(row => row.groupheader === false)[0];
    const index = rows.indexOf(firstNonHeader);
    this.changeActiveStatus(index);
  }

  focusRow(index) {
    const rows = this.rows.toArray();
    if (rows.length === 0) {
      return;
    }
    if (index === -1) {
      return;
    }

    rows.forEach(row => { row.focused = false; });
    if (index === 0) {
      rows[index].focused = true;
    } else {
      rows[index].focused = !rows[index].focused;
    }

    this.focusedRow = index;
    this.activeDecendant = rows[index].id;
    // if (!this.isRowVisible(this.activeDecendant)) {
    //   this.psb.directiveRef.scrollToElement('#' + this.activeDecendant, -5);
    // }
  }

  isRowVisible(id) {
    const container = this.elRef.nativeElement.querySelector('.ps--active-y');
    if (!container) {
      return true;
    }
    const element = document.getElementById(id);

    const cTop = container.scrollTop;
    const cBottom = cTop + container.clientHeight;

    // Get element properties
    const eTop = element.offsetTop;
    const eBottom = eTop + element.clientHeight;

    // Check if in view
    return (eTop >= cTop && eBottom <= cBottom);

  }

  changeActiveStatus(index, setFocus = true) {
    const rows = this.rows.toArray();
    if (rows.length === 0) {
      return;
    }

    if (index === -1) {
      return;
    }

    this.clearSelection();
    let selectedRowClickable = true;
    if (rows[index]) {
      selectedRowClickable = (rows[index].groupheader === false); // && rows[index].selectable === true;
    }

    this.focusedRow = index;
    if (this.focusedRow >= 0 && setFocus) {
      this.focusRow(index);
    }


    if (this.active && selectedRowClickable) {
      setTimeout(() => {
        rows[index].selected = true;
        const selected = this.rows.filter(item => item.selected).map(item => item.value);
        this.selectionChanged.emit(selected);
      }, 40);

    }
  }

}
