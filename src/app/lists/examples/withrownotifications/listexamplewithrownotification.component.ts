import { Component, OnInit } from '@angular/core';
import {
  ExpandableRow, RowNotification, NotificationType, ModalService,
  SortChangedArgs, ListHeaderComponent, SortDirection
} from '../../../../../projects/komponentkartan/src/lib/index';
import { Examples } from '../examples';
import { HtmlEncodeService } from '../../../html-encode.service';

@Component({
  selector: 'app-listexample',
  templateUrl: './listexamplewithrownotification.component.html',
  styleUrls: ['./listexamplewithrownotification.component.scss']
})
export class ListexamplewithrownotificationComponent {
  sortDirections = SortDirection;
  public peopleRows: ExpandableRow<ExamplePerson, ExamplePerson>[];
  examplePeople: ExamplePerson[];
  typeScriptAdvancedListMarkup: string;
  htmlAdvancedListMarkup: string;
  examples: Examples = new Examples();
  readOnly = true;
  actionsVisible: boolean;
  readonly: boolean;
  panelNotification: RowNotification;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.typeScriptAdvancedListMarkup =
      htmlEncoder.prepareHighlightedSection(this.examples.typeScriptAdvancedListMarkup, 'typescript');
    this.htmlAdvancedListMarkup =
      htmlEncoder.prepareHighlightedSection(this.examples.htmlAdvancedListMarkup);

    this.panelNotification = {
      message: 'Panelinformation', icon: { name: 'exclamation-circle' },
      type: NotificationType.Permanent
    } as RowNotification;

    this.examplePeople = [
      { id: '1', firstName: 'Adam', lastName: 'Andersson' } as ExamplePerson,
      { id: '2', firstName: 'Bjarne', lastName: 'Bengtsson' } as ExamplePerson,
      { id: '3', firstName: 'Carola', lastName: 'Claesson' } as ExamplePerson,
      { id: '4', firstName: 'Daniella', lastName: 'Di Maria Marquez ' } as ExamplePerson,
      { id: '5', firstName: 'Erik', lastName: '' } as ExamplePerson,
    ];

    this.peopleRows = this.examplePeople.map(x => new ExpandableRow<ExamplePerson, ExamplePerson>(x));

    this.peopleRows[0].setNotification('Meddelande: Text', { name: 'comment-dots' } );
    this.peopleRows[2].setNotification('tillfällig', { name: 'comment-dots' }, true);
    this.peopleRows[4].setNotification('Personen är inaktiv', { name: 'exclamation-circle', color: 'error', solid: true });
  }

  deleteRow(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
    // Remove visually.
    row.notifyOnRemove(row.previewObject.firstName + ' togs bort och kommer inte längre att kunna logga in', {name: 'check-circle', color: 'success'});

    /*
     Remove for real...
    */
  }

  deleteEvent() {
    console.log('Delete event emittat');
  }

  updateRow(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
    row.notifyOnCollapse(row.previewObject.firstName + ' sparades', {name: 'check-circle', color: 'success'});
  }

  updateRow2(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
    row.notifyOnCollapse(row.previewObject.firstName + ' sparades', {name: 'check-circle', color: 'success'}, true);
  }

  onSortChanged(event: SortChangedArgs) {
    this.peopleRows = this.peopleRows.sort((row1, row2) => {
      return row1.previewObject[event.key] > row2.previewObject[event.key] ? (event.direction === SortDirection.Ascending ? 1 : -1) :
        row1.previewObject[event.key] < row2.previewObject[event.key] ? (event.direction === SortDirection.Ascending ? -1 : 1) : 0;
    });
  }
}

export interface ExamplePerson {
  id: string;
  firstName: string;
  lastName: string;
}
