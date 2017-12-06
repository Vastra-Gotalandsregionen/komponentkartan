import { Component, OnInit } from '@angular/core';

import {
    SortDirection, SortChangedArgs
} from '../../component-package/controls/index';

import {
    ModalService, ModalButtonConfiguration,
} from '../../component-package/services/index';

import {
    NotificationIcon, ExpandableRow
} from '../../component-package/models/index';

@Component({
    selector: 'vgr-list-columns-example',
    templateUrl: './list-columns.component.html',
    moduleId: module.id

})
export class ListColumnsComponent implements OnInit {

    public peopleRows: ExpandableRow<ExamplePerson, any>[];
    public peopleWithUnitRows: ExpandableRow<ExamplePersonWithUnit, any>[];
    typeScriptSimpleListMarkup: string;
    htmlSimpleListMarkup: string;

    ngOnInit() {
        this.loadExamplePersonWithUnitData();

    }
    loadData() {
        this.peopleRows = [
            new ExpandableRow<ExamplePerson, any>({ id: '1', firstName: 'Git', lastName: 'Hubsson', amount: 125000 }),
            new ExpandableRow<ExamplePerson, any>({ id: '2', firstName: 'Adam', lastName: 'Lind', amount: 235000 }),
            new ExpandableRow<ExamplePerson, any>({ id: '3', firstName: 'Bjarne', lastName: 'Chi', amount: 25000 }),
            new ExpandableRow<ExamplePerson, any>({ id: '4', firstName: 'Carola', lastName: 'Bengtsson', amount: 720000 }),
            new ExpandableRow<ExamplePerson, any>({ id: '5', firstName: 'Erik', lastName: 'Karlsson', amount: 401200 }),
        ];
    }


    loadExamplePersonWithUnitData() {
        this.peopleWithUnitRows = [
            new ExpandableRow<ExamplePersonWithUnit, any>({
                id: '1', firstName: 'Git', lastName: 'Hubsson', amount: 125000,
                unitname: 'BVC & Mödravården Mölndal', unitcode: '23111', hsaid: 'SE2321000131-E000000011851', committee: '67 - Göteborgs hälso- och sjukvårdsnämnden', owner: 'Stefan Larsson'
            }),
            new ExpandableRow<ExamplePersonWithUnit, any>({
                id: '2', firstName: 'Adam', lastName: 'Lind', amount: 235000,
                unitname: 'BVC & Mödravården Mölndal', unitcode: '23111', hsaid: 'SE2321000131-E000000011851', committee: '67 - Göteborgs hälso- och sjukvårdsnämnden', owner: 'Stefan Larsson'
            }),
            new ExpandableRow<ExamplePersonWithUnit, any>({
                id: '3', firstName: 'Bjarne', lastName: 'Chi', amount: 25000,
                unitname: 'BVC & Mödravården Mölndal', unitcode: '23111', hsaid: 'SE2321000131-E000000011851', committee: '67 - Göteborgs hälso- och sjukvårdsnämnden', owner: 'Stefan Larsson'
            }),
            new ExpandableRow<ExamplePersonWithUnit, any>({
                id: '4', firstName: 'Carola', lastName: 'Bengtsson', amount: 720000,
                unitname: 'BVC & Mödravården Mölndal', unitcode: '23111', hsaid: 'SE2321000131-E000000011851', committee: '67 - Göteborgs hälso- och sjukvårdsnämnden', owner: 'Stefan Larsson'
            }),
            new ExpandableRow<ExamplePersonWithUnit, any>({
                id: '5', firstName: 'Erik', lastName: 'Karlsson', amount: 401200,
                unitname: 'BVC & Mödravården Mölndal', unitcode: '23111', hsaid: 'SE2321000131-E000000011851', committee: '67 - Göteborgs hälso- och sjukvårdsnämnden', owner: 'Stefan Larsson'
            }),
        ];
    }

    onSelectRowChanged(row: any, checked: boolean) {
        row.previewObject.selected = checked;
    }

    onDeleteRow(row: any) {
        this.removeRow(row);
    }

    removeRow(row: any) {
        this.modalService.openDialog('Ta bort raden', 'Vill du verkligen ta bort ' + row.previewObject.firstName + '?',
            new ModalButtonConfiguration('Ja', () => {
                row.notifyOnRemove(row.previewObject.firstName + ' togs bort', NotificationIcon.Ok);
                row.previewObject.selected = false;
                row.previewObject.deleted = true;

                /*
                  Remove for real...
                */
            }),
            new ModalButtonConfiguration('Nej', () => { }));
    }

    getSelectedRows(): number {
        if (!this.peopleRows) {
            return 0;
        } else {
            return this.peopleRows && this.peopleRows.filter(r => r.previewObject.selected).length;
        }
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


    constructor(private modalService: ModalService) {


    }

}

export interface ExamplePerson {
    id: string;
    firstName: string;
    lastName: string;
    amount: number;
    selected?: boolean;
}

export interface ExamplePersonWithUnit {
    id: string;
    firstName: string;
    lastName: string;
    amount: number;
    unitname: string;
    unitcode: string;
    hsaid: string;
    committee: string;
    owner: string;
}
