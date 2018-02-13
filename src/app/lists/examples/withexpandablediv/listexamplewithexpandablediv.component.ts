import { Component, OnInit } from '@angular/core';
import {
    SortDirection,  // Enum för vilket håll sorteringen skall ske.
    SortChangedArgs // Args när sorteringordningen ändras.
} from '@komponentkartan/index';
import { HtmlEncodeService } from '../../../html-encode.service';
import { Examples } from '../examples';

@Component({
    selector: 'app-listexamplewithexpandablediv',
    templateUrl: './listexamplewithexpandablediv.component.html',
    styleUrls: ['./listexamplewithexpandablediv.component.scss']
})
export class ListexamplewithexpandabledivComponent implements OnInit {

    public peopleRowsSimpleList: ExamplePerson[];
    sortDirections = SortDirection; // Fix för att kunna använda sig utav enum.
    typeScriptSimpleListMarkup: string;
    htmlSimpleListMarkup: string;
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
                children: [{ firstName: 'Lena', lastName: 'Hubsson' } as ExamplePerson,
                { firstName: 'Signe', lastName: 'Hubsson' } as ExamplePerson]
            } as ExamplePerson,
            {
                id: '2', firstName: 'Stud', lastName: 'Visualizer', occupation: 'Black Dragon', income: 450000, children: [{ firstName: 'Kalle', lastName: 'Visualizer' } as ExamplePerson,
                { firstName: 'Oskar', lastName: 'Visualizer' } as ExamplePerson]
            } as ExamplePerson,
            {
                id: '3', firstName: 'See', lastName: 'Charper', occupation: 'Chrome wizard', income: 230000, children: [{ firstName: 'Eva', lastName: 'Charper' } as ExamplePerson,
                { firstName: 'Lars', lastName: 'Charper' } as ExamplePerson]
            } as ExamplePerson,
            {
                id: '3', firstName: 'IT-Lasse', lastName: 'Andersson', occupation: 'Data', income: 600000, children: [{ firstName: 'Siv', lastName: 'Andersson' } as ExamplePerson,
                { firstName: 'Erik', lastName: 'Andersson' } as ExamplePerson]
            } as ExamplePerson
        ];
    }

    constructor(htmlEncoder: HtmlEncodeService) {

        this.typeScriptSimpleListMarkup =
            htmlEncoder.prepareHighlightedSection(this.examples.typeScriptListWithExpandableDiv, 'typescript');
        this.htmlSimpleListMarkup =
            htmlEncoder.prepareHighlightedSection(this.examples.htmlListWithExpandableDiv);
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

