import { Component, OnInit } from '@angular/core';
import { Examples } from '../examples';
import {
    SortDirection,  // Enum för vilket håll sorteringen skall ske.
    SortChangedArgs // Args när sorteringordningen ändras.
} from 'vgr-komponentkartan';

@Component({
    selector: 'app-listwithpaginationcodeexample',
    templateUrl: './listwithpaginationcodeexample.component.html',
    styleUrls: ['./listwithpaginationcodeexample.component.scss']
})
export class ListwithpaginationcodeexampleComponent implements OnInit {

    typeScriptPaginationListMarkup: string;
    htmltPaginationListMarkup: string;
    examples: Examples = new Examples();
    persons: ExamplePerson[];
    pageCount = 1;
    private itemsPerPage = 4;
    currentPage = 1;

    personsData = [
        { id: '1', firstName: 'Git', lastName: 'Hubsson', occupation: 'Ninja codewarrior', income: 300000 } as ExamplePerson,
        { id: '2', firstName: 'Stud', lastName: 'Visualizer', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
        { id: '3', firstName: 'See', lastName: 'Charper', occupation: 'Chrome wizard', income: 230000 } as ExamplePerson,
        { id: '4', firstName: 'IT-Lasse', lastName: 'Andersson', occupation: 'Data', income: 600000 } as ExamplePerson,
        { id: '5', firstName: 'Zlatan', lastName: 'Abrahamsson', occupation: 'Ninja codewarrior', income: 300000 } as ExamplePerson,
        { id: '6', firstName: 'Henke', lastName: 'Olsson', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
        { id: '7', firstName: 'Tom', lastName: 'Hyssen', occupation: 'Chrome forward', income: 230000 } as ExamplePerson,
        { id: '8', firstName: 'Glenn', lastName: 'Ströming', occupation: 'Data back', income: 600000 } as ExamplePerson,
        { id: '9', firstName: 'Olle', lastName: 'Solkjaer', occupation: 'Ninja forward', income: 300000 } as ExamplePerson,
        { id: '10', firstName: 'Ralf', lastName: 'Salah', occupation: 'Ninja forward', income: 450000 } as ExamplePerson,
        { id: '11', firstName: 'Roland', lastName: 'Ronaldo', occupation: 'Soccer wizard', income: 230000 } as ExamplePerson,
        { id: '12', firstName: 'Tor', lastName: 'Carew', occupation: 'Data forward', income: 600000 } as ExamplePerson,
        { id: '13', firstName: 'Tommy', lastName: 'Brolin', occupation: 'Soccer warrior', income: 300000 } as ExamplePerson,
        { id: '14', firstName: 'Martin', lastName: 'Sundin', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
        { id: '15', firstName: 'Peder', lastName: 'Northug', occupation: 'Skistar wizard', income: 230000 } as ExamplePerson,
        { id: '16', firstName: 'Lotten', lastName: 'Calla', occupation: 'Skistar', income: 600000 } as ExamplePerson,
        { id: '17', firstName: 'Stina', lastName: 'Jönsson', occupation: 'Skistar', income: 300000 } as ExamplePerson,
        { id: '18', firstName: 'Josefin', lastName: 'Björgen', occupation: 'Skistar', income: 450000 } as ExamplePerson,
        { id: '19', firstName: 'John', lastName: 'Borg', occupation: 'Tennis wizard', income: 230000 } as ExamplePerson,
        { id: '20', firstName: 'Mats', lastName: 'Edberg', occupation: 'Tennis data', income: 600000 } as ExamplePerson,
        { id: '21', firstName: 'Git', lastName: 'Hubsson', occupation: 'Ninja codewarrior', income: 300000 } as ExamplePerson,
        { id: '22', firstName: 'Stud', lastName: 'Visualizer', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
        { id: '23', firstName: 'See', lastName: 'Charper', occupation: 'Chrome wizard', income: 230000 } as ExamplePerson,
        { id: '24', firstName: 'IT-Lasse', lastName: 'Andersson', occupation: 'Data', income: 600000 } as ExamplePerson,
        { id: '25', firstName: 'Zlatan', lastName: 'Abrahamsson', occupation: 'Ninja codewarrior', income: 300000 } as ExamplePerson,
        { id: '26', firstName: 'Henke', lastName: 'Olsson', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
        { id: '27', firstName: 'Tom', lastName: 'Hyssen', occupation: 'Chrome forward', income: 230000 } as ExamplePerson,
        { id: '28', firstName: 'Glenn', lastName: 'Ströming', occupation: 'Data back', income: 600000 } as ExamplePerson,
        { id: '29', firstName: 'Olle', lastName: 'Solkjaer', occupation: 'Ninja forward', income: 300000 } as ExamplePerson,
        { id: '30', firstName: 'Ralf', lastName: 'Salah', occupation: 'Ninja forward', income: 450000 } as ExamplePerson,
        { id: '31', firstName: 'Roland', lastName: 'Ronaldo', occupation: 'Soccer wizard', income: 230000 } as ExamplePerson,
        { id: '32', firstName: 'Tor', lastName: 'Carew', occupation: 'Data forward', income: 600000 } as ExamplePerson,
        { id: '33', firstName: 'Tommy', lastName: 'Brolin', occupation: 'Soccer warrior', income: 300000 } as ExamplePerson,
        { id: '34', firstName: 'Martin', lastName: 'Sundin', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
        { id: '35', firstName: 'Peder', lastName: 'Northug', occupation: 'Skistar wizard', income: 230000 } as ExamplePerson,
        { id: '36', firstName: 'Lotten', lastName: 'Calla', occupation: 'Skistar', income: 600000 } as ExamplePerson,
        { id: '37', firstName: 'Stina', lastName: 'Jönsson', occupation: 'Skistar', income: 300000 } as ExamplePerson,
        { id: '38', firstName: 'Josefin', lastName: 'Björgen', occupation: 'Skistar', income: 450000 } as ExamplePerson,
        { id: '39', firstName: 'John', lastName: 'Borg', occupation: 'Tennis wizard', income: 230000 } as ExamplePerson,
        { id: '40', firstName: 'Mats', lastName: 'Edberg', occupation: 'Tennis data', income: 600000 } as ExamplePerson
    ];

    ngOnInit() {
        this.pageCount = Math.ceil(this.personsData.length / this.itemsPerPage);
        this.setPagingData(this.currentPage);
    }

    onPageChanged(page: number) {
        this.currentPage = page;
        this.setPagingData(this.currentPage);
    }

    setPagingData(page: number) {
        const start = (page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.persons = this.personsData.slice(start, end);
    }
    onSortChanged(event: SortChangedArgs) {
        this.personsData = this.personsData.sort((row1, row2) => {
            return row1[event.key] > row2[event.key] ? (event.direction === SortDirection.Ascending ? 1 : -1) :
                row1[event.key] < row2[event.key] ? (event.direction === SortDirection.Ascending ? -1 : 1) : 0;
        });
        this.setPagingData(this.currentPage);
    }
}
export interface ExamplePerson {
    id: string;
    firstName: string;
    lastName: string;
    occupation: string;
    income: number;
}

