import { Component, OnInit } from '@angular/core';
import {
    SortDirection,  // Enum för vilket håll sorteringen skall ske.
    SortChangedArgs // Args när sorteringordningen ändras.
} from 'vgr-komponentkartan';
import { HtmlEncodeService } from '../../../html-encode.service';
import { Examples } from '../examples';

@Component({
    selector: 'app-listwithpaginationcodeexample',
    templateUrl: './listwithpaginationcodeexample.component.html',
    styleUrls: ['./listwithpaginationcodeexample.component.scss']
})
export class ListwithpaginationcodeexampleComponent implements OnInit {

    public peopleRowsSimpleList: ExamplePerson[];
    pageCount = 1;
    typeScriptPaginationListMarkup: string;
    htmltPaginationListMarkup: string;
    examples: Examples = new Examples();

    ngOnInit() {
        this.initExampleData();
    }

    onPageChanged(page: number) {

    }

    initExampleData() {
        this.peopleRowsSimpleList = [
            { id: '1', firstName: 'Git', lastName: 'Hubsson', occupation: 'Ninja codewarrior', income: 300000 } as ExamplePerson,
            { id: '2', firstName: 'Stud', lastName: 'Visualizer', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
            { id: '3', firstName: 'See', lastName: 'Charper', occupation: 'Chrome wizard', income: 230000 } as ExamplePerson,
            { id: '4', firstName: 'IT-Lasse', lastName: 'Andersson', occupation: 'Data', income: 600000 } as ExamplePerson,
            { id: '5', firstName: 'Zlatan', lastName: 'Abrahamsson', occupation: 'Ninja codewarrior', income: 300000 } as ExamplePerson,
            { id: '6', firstName: 'Henke', lastName: 'Olsson', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
            { id: '7', firstName: 'Tom', lastName: 'Hyssen', occupation: 'Chrome wizard', income: 230000 } as ExamplePerson,
            { id: '8', firstName: 'Glenn', lastName: 'Ströming', occupation: 'Data', income: 600000 } as ExamplePerson,
            { id: '9', firstName: 'Olle', lastName: 'Solkjaer', occupation: 'Ninja codewarrior', income: 300000 } as ExamplePerson,
            { id: '10', firstName: 'Ralf', lastName: 'Salah', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
            { id: '11', firstName: 'Roland', lastName: 'Ronaldo', occupation: 'Chrome wizard', income: 230000 } as ExamplePerson,
            { id: '12', firstName: 'Tor', lastName: 'Carew', occupation: 'Data', income: 600000 } as ExamplePerson,
            { id: '13', firstName: 'Tommy', lastName: 'Brolin', occupation: 'Ninja codewarrior', income: 300000 } as ExamplePerson,
            { id: '14', firstName: 'Martin', lastName: 'Sundin', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
            { id: '15', firstName: 'Peder', lastName: 'Northug', occupation: 'Chrome wizard', income: 230000 } as ExamplePerson,
            { id: '16', firstName: 'Lotten', lastName: 'Calla', occupation: 'Data', income: 600000 } as ExamplePerson,
            { id: '17', firstName: 'Stina', lastName: 'Jönsson', occupation: 'Ninja codewarrior', income: 300000 } as ExamplePerson,
            { id: '18', firstName: 'Josefin', lastName: 'Björgen', occupation: 'Black Dragon', income: 450000 } as ExamplePerson,
            { id: '19', firstName: 'John', lastName: 'Borg', occupation: 'Chrome wizard', income: 230000 } as ExamplePerson,
            { id: '20', firstName: 'Mats', lastName: 'Edberg', occupation: 'Data', income: 600000 } as ExamplePerson
        ];
    }


    constructor(htmlEncoder: HtmlEncodeService) {

        this.typeScriptPaginationListMarkup =
            htmlEncoder.prepareHighlightedSection(this.examples.typeScriptPaginationListMarkup, 'typescript');
        this.htmltPaginationListMarkup =
            htmlEncoder.prepareHighlightedSection(this.examples.htmltPaginationListMarkup);
    }

}
export interface ExamplePerson {
    id: string;
    firstName: string;
    lastName: string;
    occupation: string;
    income: number;
}

