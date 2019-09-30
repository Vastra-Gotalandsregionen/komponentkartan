import { Component, OnInit } from '@angular/core';
import { GridSortChangedArgs, GridSortDirection } from '../../../projects/komponentkartan/src/lib';

@Component({
  selector: 'vgr-arvid',
  templateUrl: './arvid.component.html',
  styleUrls: ['./arvid.component.css']
})
export class ArvidComponent implements OnInit {

  preventCollapse = false;

  people: Person[] = [
    {
      namn: 'Adam',
      efternamn: 'Andersson',
      notifications: [{
        text: 'Meddelande: Text',
        type: 'comment'
      }],
      expanded: false
    },
    {
      namn: 'Bjarne',
      efternamn: 'Bengtsson',
      notifications: [],
      expanded: false
    },
    {
      namn: 'Carola',
      efternamn: 'Claesson',
      notifications: [],
      expanded: false
    },
    {
      namn: 'Daniella',
      efternamn: 'Di Maria Marqueez',
      notifications: [],
      expanded: false
    },
    {
      namn: 'Erik',
      efternamn: '',
      notifications: [{
        text: 'Personen är inaktiv',
        type: 'error'
      }],
      expanded: false
    }
  ];
  vanster = [
    { fornamn: 'Arvid', efternamn: 'Sollenby' },
    { fornamn: 'Fredrik', efternamn: 'Aronsson' },
    { fornamn: 'Caroline', efternamn: 'Bornsjö' },
    { fornamn: 'Torin', efternamn: 'Williams' },
  ];
  hoger = [
    { fornamn: 'Olga', efternamn: 'Akselrad' },
    { fornamn: 'Markus', efternamn: 'Rydin' },
    { fornamn: 'Jörgen', efternamn: 'Åkesson' },
    { fornamn: 'Sofia', efternamn: 'Hejdenberg' },
  ];
  people2: any = [];
  clicks = 1;

  constructor() { }

  ngOnInit() {
    // this.people2 = JSON.parse(JSON.stringify(this.vanster));
  }

  addRow() {
    this.people.unshift({
      namn: 'Pelle',
      efternamn: 'Karlsson',
      notifications: [],
      expanded: false
    });
  }

  togglePeople() {
    this.people2 = JSON.parse(JSON.stringify(this.clicks % 2 === 0 ? this.hoger : this.vanster));
    this.clicks++;
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

}


export interface Person {
  namn: string;
  efternamn: string;
  notifications?: Notification[];
  expanded?: boolean;
}

export interface Notification {
  text: string;
  type: 'default' | 'error' | 'success' | 'comment';
  icon?: string;
}