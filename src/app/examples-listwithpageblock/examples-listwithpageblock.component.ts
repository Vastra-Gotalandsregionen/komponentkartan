import { Component, OnInit } from '@angular/core';

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
        id: '1', firstName: 'Git', lastName: 'Hubsson', occupation: 'Ninja codewarrior', income: 80000,
        children: [
          { firstName: 'Lena', lastName: 'Hubsson' } as ExamplePerson,
          { firstName: 'Signe', lastName: 'Hubsson' } as ExamplePerson]
      } as ExamplePerson,
      {
        id: '2', firstName: 'Stud', lastName: 'Visualizer', occupation: 'Black Dragon', income: 50000,
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
    this.peopleFiltered = this.people.slice(0);
  }

  toggle() {
    this.showAll = !this.showAll;
    if (this.showAll) {
      this.peopleFiltered = this.people.slice(0);
    } else {
      this.peopleFiltered = this.people.filter(x => x.income < 100000);
    }
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
