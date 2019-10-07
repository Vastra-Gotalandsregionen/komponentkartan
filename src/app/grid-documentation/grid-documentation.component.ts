import { Component, OnInit } from '@angular/core';
import { GridSortChangedArgs, GridSortDirection } from '../../../projects/komponentkartan/src/lib';

@Component({
  selector: 'vgr-grid-documentation',
  templateUrl: './grid-documentation.component.html',
  styleUrls: ['./grid-documentation.component.css']
})
export class GridDocumentationComponent implements OnInit {
  people: Person[] = [
    {
      namn: 'Adam',
      efternamn: 'Andersson',
      notifications: [{
        text: 'Meddelande: Text',
        type: 'comment'
      }],
      expanded: false,
      checked: false
    },
    {
      namn: 'Bjarne',
      efternamn: 'Bengtsson',
      notifications: [],
      expanded: false,
      checked: false
    },
    {
      namn: 'Carola',
      efternamn: 'Claesson',
      notifications: [],
      expanded: false,
      checked: false
    },
    {
      namn: 'Daniella',
      efternamn: 'Di Maria Marqueez',
      notifications: [],
      expanded: false,
      checked: false
    },
    {
      namn: 'Erik',
      efternamn: '',
      notifications: [{
        text: 'Personen är inaktiv',
        type: 'error'
      }],
      expanded: false,
      checked: false
    }
  ];

  people2: any[] = [
    { fornamn: 'Arvid', efternamn: 'Sollenby', expanded: false, checked: false },
    { fornamn: 'Fredrik', efternamn: 'Aronsson', expanded: false, checked: false },
    { fornamn: 'Caroline', efternamn: 'Bornsjö', expanded: false, checked: false },
    { fornamn: 'Torin', efternamn: 'Williams', expanded: false, checked: false },
    { fornamn: 'Olga', efternamn: 'Akselrad', expanded: false, checked: false },
    { fornamn: 'Markus', efternamn: 'Rydin', expanded: false, checked: false },
    { fornamn: 'Jörgen', efternamn: 'Åkesson', expanded: false, checked: false },
    { fornamn: 'Sofia', efternamn: 'Hejdenberg', expanded: false, checked: false },
  ];
  activePage = 1;
  pageCount = 1;
  itemsPerPage = 3;
  paginatedPeople: any[] = [];

  ngOnInit() {
    this.setPagingData(this.activePage);
  }

  addRow() {
    const pelle = {
      namn: 'Pelle',
      efternamn: 'Karlsson',
      notifications: [{
        text: 'Pelle lades till.',
        type: 'success'
      } as any],
      expanded: true,
      checked: false
    };

    this.people.unshift(pelle);
    setTimeout(() => {
      pelle.expanded = false;
    }, 2500);
    setTimeout(() => {
      pelle.notifications.pop();
    }, 2500);
  }

  sort(args: GridSortChangedArgs) {
    this.people = this.people.sort((row1, row2) => {
      return row1[args.key] > row2[args.key] ? (args.direction === GridSortDirection.Ascending ? 1 : -1) :
        row1[args.key] < row2[args.key] ? (args.direction === GridSortDirection.Ascending ? -1 : 1) : 0;
    });
  }

  sort2(args: GridSortChangedArgs) {
    this.people2 = this.people2.sort((row1, row2) => {
      return row1[args.key] > row2[args.key] ? (args.direction === GridSortDirection.Ascending ? 1 : -1) :
        row1[args.key] < row2[args.key] ? (args.direction === GridSortDirection.Ascending ? -1 : 1) : 0;
    });
  }

  updateRow(row: Person, clear = false) {
    if (row.notifications.length > 0) {
      const originalNotification = JSON.parse(JSON.stringify(row.notifications[0]));
      row.notifications[0].text = row.namn + ' sparades';
      row.notifications[0].type = 'success';
      row.expanded = false;
      setTimeout(() => {
        if (clear) {
          row.notifications.pop();
        } else {
          row.notifications[0].text = originalNotification.text;
          row.notifications[0].type = originalNotification.type;
        }
      }, 2500);
    } else {
      row.notifications.push({
        text: row.namn + ' sparades',
        type: 'success'
      });
      setTimeout(() => row.expanded = false, 1000);
      setTimeout(() => {
        row.notifications.pop();
      }, 2500);
    }
  }

  deleteRow(row: Person) {
    const index = this.people.indexOf(row);
    if (row.notifications.length > 0) {
      row.notifications[0].text = row.namn + ' togs bort och kommer inte längre kunna logga in';
      row.notifications[0].type = 'success';
    } else {
      row.notifications = [{
        text: row.namn + ' togs bort och kommer inte längre kunna logga in',
        type: 'success'
      }];
    }
    row.notifications = [{
      text: row.namn + ' togs bort och kommer inte längre kunna logga in',
      type: 'success'
    }];
    setTimeout(() => row.expanded = false, 1000);
    setTimeout(() => {
      this.people.splice(index, 1);
    }, 2500);
  }

  toggleChecked(row: Person) {
    row.checked = !row.checked;
  }

  setAllChecked(checked: boolean) {
    this.paginatedPeople.forEach(x => x.checked = checked);
  }

  get anyIsChecked(): boolean {
    return this.paginatedPeople.some(x => x.checked === true);
  }

  get allChecked(): boolean {
    if (this.people2.length > 0) {
      return this.paginatedPeople.every(x => x.checked);
    }
    return false;
  }

  onPageChanged(page: number) {
    this.setPagingData(page);
  }

  setPagingData(page: number) {
    this.activePage = page;
    this.pageCount = Math.ceil(this.people2.length / this.itemsPerPage);
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.paginatedPeople = this.people2.slice(start, end);
  }
}


export interface Person {
  namn: string;
  efternamn: string;
  notifications?: Notification[];
  expanded?: boolean;
  checked: boolean;
}

export interface Notification {
  text: string;
  type: 'default' | 'error' | 'success' | 'comment';
  icon?: string;
}