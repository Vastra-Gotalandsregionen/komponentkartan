export class Examples {
  htmlBasicListStructureMarkup = `
  <vgr-list">
  <!-- Rootelementet -->
  <vgr-list-header>
  <!-- Header kan inhehålla flera kolumn-headers -->
    <vgr-list-column-header>
    <!-- Lägg rubriktext i kolumn-header här -->
    </vgr-list-column-header>
  </vgr-list-header>
  <vgr-list-item>
  <!-- Motsvarar en rad -->
    <vgr-list-item-header>
    <!-- List-item-header-element för ett list-item, kan innehålla flera kolumner med rubrik  -->
      <vgr-list-column></vgr-list-column>
      <!-- Anger rubrik för list-item-kolumnen -->
    </vgr-list-item-header>
    <vgr-list-item-content>
    <!-- Innehåll för ett list-item -->
    </vgr-list-item-content>
  </vgr-list-item>
</vgr-list>`;

  typeScriptListWithExpandableDiv = `import { Component, OnInit } from '@angular/core';
  import {
      SortDirection,  // Enum för vilket håll sorteringen skall ske.
      SortChangedArgs // Args när sorteringordningen ändras.
  } from 'vgr-komponentkartan';

  @Component({
      selector: 'app-listexamplewithexpandablediv',
      templateUrl: './listexamplewithexpandablediv.component.html',
      styleUrls: ['./listexamplewithexpandablediv.component.scss']
  })
  export class ListexamplewithexpandabledivComponent implements OnInit {

      public peopleRowsSimpleList: ExamplePerson[];
      sortDirections = SortDirection; // Fix för att kunna använda sig utav enum.
      examples: Examples = new Examples();
      onSortChanged(event: SortChangedArgs) {
          this.peopleRowsSimpleList = this.peopleRowsSimpleList.sort((row1, row2) => {
              return row1[event.key] > row2[event.key] ? (event.direction === SortDirection.Ascending ? 1 : -1) :
                  row1[event.key] < row2[event.key] ? (event.direction === SortDirection.Ascending ? -1 : 1) : 0;
          });
      }
      ngOnInit() {
          this.initExampleData();
      }

      initExampleData() {
          this.peopleRowsSimpleList = [
              {
                  id: '1', firstName: 'Git', lastName: 'Hubsson', occupation: 'Ninja codewarrior', income: 300000,
                  children: [
                      { firstName: 'Lena', lastName: 'Hubsson' } as ExamplePerson,
                      { firstName: 'Signe', lastName: 'Hubsson' } as ExamplePerson]
              } as ExamplePerson,
              {
                  id: '2', firstName: 'Stud', lastName: 'Visualizer', occupation: 'Black Dragon', income: 450000,
                  children: [
                      { firstName: 'Kalle', lastName: 'Visualizer' } as ExamplePerson,
                      { firstName: 'Oskar', lastName: 'Visualizer' } as ExamplePerson]
              } as ExamplePerson,
              {
                  id: '3', firstName: 'See', lastName: 'Charper', occupation: 'Chrome wizard', income: 230000,
                  children: [
                      { firstName: 'Eva', lastName: 'Charper' } as ExamplePerson,
                      { firstName: 'Lars', lastName: 'Charper' } as ExamplePerson]
              } as ExamplePerson,
              {
                  id: '3', firstName: 'IT-Lasse', lastName: 'Andersson', occupation: 'Data', income: 600000,
                  children: [
                      { firstName: 'Siv', lastName: 'Andersson' } as ExamplePerson,
                      { firstName: 'Erik', lastName: 'Andersson' } as ExamplePerson]
              } as ExamplePerson
          ];
      }

      constructor() { }
  }
  export interface ExamplePerson {
      id: string;
      firstName: string;
      lastName: string;
      occupation: string;
      income: number;
      children: ExamplePerson[];
  }`;

  htmlListWithExpandableDiv = `<vgr-list [flexibleHeader]="true" (sortChanged)="onSortChanged($event)">
  <vgr-list-header>
    <vgr-list-column-header width="5" sortKey="firstName" [sortDirection]="sortDirections.Ascending">Förnamn</vgr-list-column-header>
    <vgr-list-column-header width="5" sortKey="lastName">Efternamn</vgr-list-column-header>
    <vgr-list-column-header width="5" sortKey="occupation">Yrke</vgr-list-column-header>
    <vgr-list-column-header align="right" width="5" sortKey="income">Inkomst</vgr-list-column-header>
  </vgr-list-header>
  <vgr-list-item *ngFor="let row of peopleRowsSimpleList">
    <vgr-list-item-header>
      <vgr-list-column width="5">{{row.firstName}}</vgr-list-column>
      <vgr-list-column width="5">{{row.lastName}}</vgr-list-column>
      <vgr-list-column width="5">{{row.occupation}}</vgr-list-column>
      <vgr-list-column width="5" align="right">{{row.income | number:'2.2-2':'sv-SE'}}</vgr-list-column>
    </vgr-list-item-header>
    <vgr-list-item-content [indentContent]="false">
      <vgr-expandable-div *ngFor="let row of row.children" [expanded]="false">
        <vgr-expandable-div-header>
          <h2>Barn</h2>
        </vgr-expandable-div-header>
        <vgr-expandable-div-content>
          <span>Förnamn: {{row.firstName}}</span>
          <br>
          <span>Efternamn: {{row.lastName}}</span>
        </vgr-expandable-div-content>
      </vgr-expandable-div>
    </vgr-list-item-content>
  </vgr-list-item>
</vgr-list>`;


  typeScriptSimpleListMarkup = `import { Component, OnInit } from '@angular/core';
    import {
      SortDirection,  // Enum för vilket håll sorteringen skall ske.
      SortChangedArgs // Args när sorteringordningen ändras.
    } from 'vgr-komponentkartan/';

    @Component({
      selector: 'app-listcodeexample',
      templateUrl: './listcodeexample.component.html',
      styleUrls: ['./listcodeexample.component.scss']
    })
    export class ListcodeexampleComponent implements OnInit {
      public peopleRowsSimpleList: ExamplePerson[];

      sortDirections = SortDirection; // Fix för att kunna använda sig utav enum.
      constructor() {
        this.peopleRowsSimpleList = [
          { id: '1', firstName: 'Git', lastName: 'Hubsson', occupation: 'Ninja codewarrior', income: 300000 } as ExamplePerson,
          { id: '2', firstName: 'Stud', lastName: 'Visualizer', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
          { id: '3', firstName: 'See', lastName: 'Charper', occupation: 'Chrome wizard', income: 230000 } as ExamplePerson,
          { id: '3', firstName: 'IT-Lasse', lastName: 'Andersson', occupation: 'Data', income: 600000 } as ExamplePerson
        ];
      }

      onSortChanged(event: SortChangedArgs) {
        this.peopleRowsSimpleList = this.peopleRowsSimpleList.sort((row1, row2) => {
          return row1[event.key] > row2[event.key] ? (event.direction === SortDirection.Ascending ? 1 : -1) :
            row1[event.key] < row2[event.key] ? (event.direction === SortDirection.Ascending ? -1 : 1) : 0;
        });
      }
      ngOnInit() {
      }
    }
    export interface ExamplePerson {
      id: string;
      firstName: string;
      lastName: string;
      occupation: string;
      income: number;
    }`;

  htmltSimpleListMarkup = ` <vgr-list [flexibleHeader]="true" (sortChanged)="onSortChanged($event)">
  <vgr-list-header>
    <vgr-list-column-header width="5" sortKey="firstName" [sortDirection]="sortDirections.Ascending">Förnamn</vgr-list-column-header>
    <vgr-list-column-header width="5" sortKey="lastName">Efternamn</vgr-list-column-header>
    <vgr-list-column-header width="5" sortKey="occupation">Yrke</vgr-list-column-header>
    <vgr-list-column-header align="right" width="5" sortKey="income">Inkomst</vgr-list-column-header>
  </vgr-list-header>
  <vgr-list-item *ngFor="let row of peopleRowsSimpleList">
    <vgr-list-item-header>
      <vgr-list-column width="5">{{row.firstName}}</vgr-list-column>
      <vgr-list-column width="5">{{row.lastName}}</vgr-list-column>
      <vgr-list-column width="5">{{row.occupation}}</vgr-list-column>
      <vgr-list-column width="5" align="right">{{row.income | number:'2.2-2':'sv-SE'}}</vgr-list-column>
    </vgr-list-item-header>
    <vgr-list-item-content>
        <span>Förnamn: {{row.firstName}}</span>
        <br>
        <span>Efternamn: {{row.lastName}}</span>
        <br>
        <span>Yrke: {{row.occupation}}</span>
        <br>
        <span>Inkomst: {{row.income | currency : 'SEK'}}</span>
    </vgr-list-item-content>
  </vgr-list-item>
</vgr-list>`;

  typeScriptAdvancedListMarkup = `import { Component, OnInit } from '@angular/core';
  import {
    ExpandableRow, RowNotification, NotificationType, ModalService,
    SortChangedArgs, ListHeaderComponent, SortDirection
  } from 'vgr-komponentkartan';
  import { Examples } from '../examples';
  import { HtmlEncodeService } from '../../../html-encode.service';

  @Component({
    selector: 'app-listexample',
    templateUrl: './listexample.component.html',
    styleUrls: ['./listexample.component.scss']
  })
  export class ListexampleComponent {
    sortDirections = SortDirection;
    public peopleRows: ExpandableRow<ExamplePerson, ExamplePerson>[];
    examplePeople: ExamplePerson[];
    typeScriptAdvancedListMarkup: string;
    htmlAdvancedListMarkup: string;
    examples: Examples = new Examples();
    readOnly = true;
    actionsVisible: boolean;
    readonly: boolean;

    constructor(htmlEncoder: HtmlEncodeService) {
      this.typeScriptAdvancedListMarkup =
        htmlEncoder.prepareHighlightedSection(this.examples.typeScriptAdvancedListMarkup, 'typescript');
      this.htmlAdvancedListMarkup =
        htmlEncoder.prepareHighlightedSection(this.examples.htmlAdvancedListMarkup);
      this.examplePeople = [
        { id: '1', firstName: 'Adam', lastName: 'Andersson' } as ExamplePerson,
        { id: '2', firstName: 'Bjarne', lastName: 'Bengtsson' } as ExamplePerson,
        { id: '3', firstName: 'Carola', lastName: 'Claesson' } as ExamplePerson,
        { id: '4', firstName: 'Daniella', lastName: 'Di Maria Marquez ' } as ExamplePerson,
        { id: '5', firstName: 'Erik', lastName: '' } as ExamplePerson,
      ];

      this.peopleRows = this.examplePeople.map(x => new ExpandableRow<ExamplePerson, ExamplePerson>(x));

      this.peopleRows[0].setNotification('Meddelande: Text', 'vgr-icon-message');
      this.peopleRows[4].setNotification('Personen är inaktiv', 'vgr-icon-exclamation--red');
    }

    deleteRow(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
      // Remove visually.
      row.notifyOnRemove(row.previewObject.firstName + ' togs bort och kommer inte längre att kunna logga in', 'vgr-icon-ok-check');
    }

    updateRow(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
      row.notifyOnCollapse(row.previewObject.firstName + ' sparades', 'vgr-icon-ok-check-green');
    }

    updateRow2(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
      row.notifyOnCollapse(row.previewObject.firstName + ' sparades', 'vgr-icon-ok-check-green', true);
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
  `;
  htmlAdvancedListMarkup = `<vgr-list [flexibleHeader]="true" [allowMultipleExpandedItems]="false" (sortChanged)="onSortChanged($event)">
  <vgr-list-header>
    <vgr-list-column-header [width]="10" [sortKey]="'firstName'" [sortDirection]="sortDirections.Ascending">Förnamn</vgr-list-column-header>
    <vgr-list-column-header [width]="10" [sortKey]="'lastName'">Efternamn</vgr-list-column-header>
  </vgr-list-header>
  <vgr-list-item *ngFor="let row of peopleRows" [notification]="row.notification" [expanded]="row.expanded">
    <vgr-list-item-header>
      <vgr-list-column [width]="10">{{row.previewObject.firstName}}</vgr-list-column>
      <vgr-list-column [width]="10">{{row.previewObject.lastName}}</vgr-list-column>
    </vgr-list-item-header>
    <vgr-list-item-content>
      <vgr-button [secondary]="true" (click)="updateRow(row)">Uppdatera</vgr-button>
      <vgr-button [secondary]="true" (click)="updateRow2(row)">Uppdatera och rensa meddelande</vgr-button>
      <vgr-button [secondary]="true" (click)="deleteRow(row)">Ta bort</vgr-button>
    </vgr-list-item-content>
  </vgr-list-item>
</vgr-list>`;

  htmlActionButtonsListMarkup = `<vgr-list [flexibleHeader]="true" (sortChanged)="onSortChanged($event)">
  <vgr-list-header>
    <vgr-list-column-header width="8" sortKey="firstName" [sortDirection]="sortDirections.Ascending">Förnamn</vgr-list-column-header>
    <vgr-list-column-header width="5" sortKey="lastName">Efternamn</vgr-list-column-header>
    <vgr-list-column-header width="3" sortKey="amount">Årsbelopp</vgr-list-column-header>
    <vgr-list-column-header width="1"></vgr-list-column-header>
    <vgr-list-column-header-checkbox width="3" text="Markera alla" [checked]="allChecked" (checkedChanged)="onSelectAllChanged($event)"></vgr-list-column-header-checkbox>
  </vgr-list-header>
  <vgr-list-item *ngFor="let row of peopleRows" [notification]="row.notification" (deleted)="notifyOnDelete(row)">
    <vgr-list-item-header>
      <vgr-list-column width="5">{{row.firstName}}</vgr-list-column>
      <vgr-list-column width="5">{{row.lastName}}</vgr-list-column>
      <vgr-list-column width="5" align="right">{{row.income | number:'2.2-2':'sv-SE'}}</vgr-list-column>
      <vgr-list-column-trashcan [disabled]="row.previewObject.deleted" (delete)="onDeleteRow(row)" width="1"></vgr-list-column-trashcan>
      <vgr-list-column-checkbox [disabled]="row.previewObject.deleted" [checked]="row.previewObject.selected" (checkedChanged)="onSelectRowChanged(row, $event)"
        width="3"></vgr-list-column-checkbox>
    </vgr-list-item-header>
    <vgr-list-item-content>
      <span>Mer information</span>
    </vgr-list-item-content>
  </vgr-list-item>
</vgr-list>
<br>
<p>Du har valt {{ getSelectedRows() }} rader</p>

<vgr-modal id="notifyDeleteModal">
  <vgr-modal-header>Info</vgr-modal-header>
  <vgr-modal-content>
    <p>Du tog bort detta objektet {{removedObjectString}}</p>
  </vgr-modal-content>
  <vgr-modal-footer>
    <vgr-button [secondary]="true" (click)="closeModal('notifyDeleteModal')">Stäng</vgr-button>
  </vgr-modal-footer>
</vgr-modal>
<vgr-modal id="removeRowModal">
  <vgr-modal-header>Ta bort raden</vgr-modal-header>
  <vgr-modal-content>
    <p>Vill du verkligen ta bort {{!rowToRemove || rowToRemove.previewObject.firstName}}?</p>
  </vgr-modal-content>
  <vgr-modal-footer>
    <vgr-button (click)="removeSelectedRow()">Ja</vgr-button>
    <vgr-button (click)="closeModal('removeRowModal')">Nej</vgr-button>
  </vgr-modal-footer>
</vgr-modal>
`;

  typeScriptActionButtonsListMarkup = `import { Component } from '@angular/core';
    import { HtmlEncodeService } from '../../../html-encode.service';
    import { Examples } from '../examples';
    import {
        ModalService, ExpandableRow,
        SortDirection, SortChangedArgs
    } from 'vgr-komponentkartan/';

    @Component({
        selector: 'app-listexamplewithactionbuttons',
        templateUrl: './listexamplewithactionbuttons.component.html',
        styleUrls: ['./listexamplewithactionbuttons.component.scss']
    })
    export class ListExampleWithActionButtonsComponent {

        public peopleRows: ExpandableRow<ExamplePerson, any>[];

        createExampleList(): ExpandableRow<ExamplePerson, any>[] {
            return [
                new ExpandableRow<ExamplePerson, any>({ id: '1', firstName: 'Git', lastName: 'Hubsson', amount: 125000 }),
                new ExpandableRow<ExamplePerson, any>({ id: '2', firstName: 'Adam', lastName: 'Lind', amount: 235000 }),
                new ExpandableRow<ExamplePerson, any>({ id: '3', firstName: 'Bjarne', lastName: 'Chi', amount: 25000 }),
                new ExpandableRow<ExamplePerson, any>({ id: '4', firstName: 'Carola', lastName: 'Bengtsson', amount: 720000 }),
                new ExpandableRow<ExamplePerson, any>({ id: '5', firstName: 'Erik', lastName: 'Karlsson', amount: 401200 }),
            ];
        }

        get allChecked() {
            return this.peopleRows && !this.peopleRows.filter(r => !r.previewObject.deleted).find(x => !x.previewObject.selected);
        }

        loadData() {
            this.peopleRows = this.createExampleList();
        }

        onSelectRowChanged(row: any, checked: boolean) {
            row.previewObject.selected = checked;
        }

        onSelectAllChanged(checked: boolean) {
            if (this.peopleRows) {
                this.peopleRows.filter(r => !r.previewObject.deleted).forEach(x => x.previewObject.selected = checked);
            }
        }

        onDeleteRow(row: any) {
            this.removeRow(row);
        }

        notifyOnDelete(row: any) {
          this.removedObjectString = JSON.stringify(row);
          this.peopleRows = this.peopleRows.filter(i => i !== row);
          this.modalService.openDialog('notifyDeleteModal');
        }

        removeRow(row: ExpandableRow<ExamplePerson, any>) {
            this.rowToRemove = row;
            this.modalService.openDialog('removeRowModal');
        }

        removeSelectedRow() {
            this.rowToRemove.notifyOnRemove(this.rowToRemove.previewObject.firstName + ' togs bort', 'vgr-icon-ok-check');
            this.rowToRemove.previewObject.selected = false;
            this.rowToRemove.previewObject.deleted = true;
            /*
              Remove for real...
            */
            this.modalService.closeDialog('removeRowModal');
        }

        getSelectedRows(): number {
            return this.peopleRows && this.peopleRows.filter(r => r.previewObject.selected).length;
        }

        closeModal(modalId: string) {
          this.modalService.closeDialog(modalId);
        }

        onSortChanged(event: SortChangedArgs) {

            if (event.key === 'selected') {
                if (event.direction === SortDirection.Ascending) {
                    this.peopleRows = this.peopleRows.sort(function (x, y) {
                        return (x.previewObject.selected === y.previewObject.selected) ? 0 : x.previewObject.selected ? -1 : 1;
                    });
                } else {
                    this.peopleRows = this.peopleRows.sort(function (x, y) {
                        return (x.previewObject.selected === y.previewObject.selected) ? 0 : y.previewObject.selected ? -1 : 1;
                    });
                }
            } else {
                this.peopleRows = this.peopleRows.sort((row1, row2) => {
                    return row1.previewObject[event.key] > row2.previewObject[event.key] ?
                        (event.direction === SortDirection.Ascending ? 1 : -1) :
                        row1.previewObject[event.key] < row2.previewObject[event.key] ?
                            (event.direction === SortDirection.Ascending ? -1 : 1) : 0;
                });
            }
        }


        constructor(private modalService: ModalService) {}

    }

    export interface ExamplePerson {
        id: string;
        firstName: string;
        lastName: string;
        amount: number;
        selected?: boolean;
        deleted?: boolean;
    }

    `;

  htmlListNotificationMarkup = `
      <vgr-list [flexibleHeader]="true" [allowMultipleExpandedItems]="false" [notification]="listNotification">
        <vgr-list-header>
          <vgr-list-column-header [width]="10" [sortKey]="'firstName'" >Förnamn</vgr-list-column-header>
          <vgr-list-column-header [width]="10" [sortKey]="'lastName'">Efternamn</vgr-list-column-header>
        </vgr-list-header>
      </vgr-list>
    `;

  typescriptListNotificationMarkup = `
    import { Component, OnInit } from '@angular/core';
    import {
      ExpandableRow, RowNotification, NotificationType, ModalService,
      SortChangedArgs, ListHeaderComponent, SortDirection, Notification
    } from 'vgr-komponentkartan';
    import { Examples } from '../examples';
    import { HtmlEncodeService } from '../../../html-encode.service';

    @Component({
      selector: 'app-listexample',
      templateUrl: './listexample.component.html',
      styleUrls: ['./listexample.component.scss']
    })
    export class ListexampleComponent {
      typeScriptAdvancedListMarkup: string;
      htmlAdvancedListMarkup: string;
      examples: Examples = new Examples();
      panelNotification: RowNotification;
      listNotification: Notification;

      constructor(htmlEncoder: HtmlEncodeService) {
        this.typeScriptAdvancedListMarkup =
          htmlEncoder.prepareHighlightedSection(this.examples.typeScriptAdvancedListMarkup, 'typescript');
        this.htmlAdvancedListMarkup =
          htmlEncoder.prepareHighlightedSection(this.examples.htmlListNotificationMarkup);

        this.listNotification = {
          message: 'Här är ett exempel på en list-notifikation. De kan användas om det t.ex. blir något fel när man hämtar datan från servicen.',
          icon: 'vgr-icon-exclamation--red'
        };

      }
    }
    `;
}
