import { Component, OnInit } from '@angular/core';
import {
  SortDirection,  // Enum för vilket håll sorteringen skall ske.
  SortChangedArgs // Args när sorteringordningen ändras.
} from 'vgr-komponentkartan';

@Component({
  selector: 'app-examples-listwithpageblock',
  templateUrl: './examples-listwithpageblock.component.html',
  styleUrls: ['./examples-listwithpageblock.component.scss']
})
export class ExamplesListwithpageblockComponent implements OnInit {

  showAll = true;
  people: ExamplePerson[];
  peopleFiltered: ExamplePerson[];

  ngOnInit() {
    this.people = [
      {
        id: '1', firstName: 'Git', lastName: 'Hubsson', occupation: 'Ninja codewarrior', income: 300000,
        children: [
          { firstName: 'Lena', lastName: 'Hubsson' } as ExamplePerson,
          { firstName: 'Signe', lastName: 'Hubsson' } as ExamplePerson
        ]
      } as ExamplePerson,
      {
        id: '2', firstName: 'Stud', lastName: 'Visualizer', occupation: 'Black Dragon', income: 50000,
        children: [
          { firstName: 'Kalle', lastName: 'Visualizer' } as ExamplePerson,
          { firstName: 'Oskar', lastName: 'Visualizer' } as ExamplePerson
        ]
      } as ExamplePerson,
      {
        id: '3', firstName: 'See', lastName: 'Charper', occupation: 'Chrome wizard', income: 230000,
        children: [
          { firstName: 'Eva', lastName: 'Charper' } as ExamplePerson,
          { firstName: 'Lars', lastName: 'Charper' } as ExamplePerson
        ]
      } as ExamplePerson,
      {
        id: '4', firstName: 'IT-Lasse', lastName: 'Andersson', occupation: 'Data', income: 600000,
        children: [
          { firstName: 'Siv', lastName: 'Andersson' } as ExamplePerson,
          { firstName: 'Erik', lastName: 'Andersson' } as ExamplePerson
        ]
      } as ExamplePerson
    ];
    this.peopleFiltered = this.people.slice(0);
    this.onSortChanged({ key: 'enhet', direction: SortDirection.Ascending } as SortChangedArgs);  }

  toggle() {
    this.showAll = !this.showAll;
    this.peopleFiltered = this.showAll ? this.people.slice(0) : this.people.filter(x => x.income < 100000);
  }
  onSortChanged(event: SortChangedArgs) {
    this.peopleFiltered = this.peopleFiltered.sort((row1, row2) => {
        return row1[event.key] > row2[event.key] ? (event.direction === SortDirection.Ascending ? 1 : -1) :
            row1[event.key] < row2[event.key] ? (event.direction === SortDirection.Ascending ? -1 : 1) : 0;
    });
  }
}

export interface ExamplePerson {
  id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  income: number;
  children: ExamplePerson[];
}
