import { Component } from '@angular/core';
import { HtmlEncodeService } from '../../../html-encode.service';
import { Examples } from '../examples';
import {
    ModalService, ModalButtonConfiguration, ExpandableRow,
    SortDirection, SortChangedArgs
} from 'vgr-komponentkartan';

@Component({
    selector: 'app-listexamplewithactionbuttons',
    templateUrl: './listexamplewithactionbuttons.component.html',
    styleUrls: ['./listexamplewithactionbuttons.component.scss']
})
export class ListExampleWithActionButtonsComponent {

    public peopleRows: ExpandableRow<ExamplePerson, any>[];
    typeScriptSimpleListMarkup: string;
    htmlSimpleListMarkup: string;
    examples: Examples = new Examples();

    get allChecked() {
        return this.peopleRows && !this.peopleRows.filter(r => !r.previewObject.deleted).find(x => !x.previewObject.selected);
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
        this.modalService.openDialog('Info', 'Du tog bort detta objektet: ' + JSON.stringify(row, null, '\t'),
            new ModalButtonConfiguration('Stäng', () => {
            })
        );
    }

    removeRow(row: ExpandableRow<ExamplePerson, any>) {
        this.modalService.openDialog('Ta bort raden', 'Vill du verkligen ta bort ' + row.previewObject.firstName + '?',
            new ModalButtonConfiguration('Ja', () => {
                row.notifyOnRemove(row.previewObject.firstName + ' togs bort', 'vgr-icon-ok-check');
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


    constructor(htmlEncoder: HtmlEncodeService, private modalService: ModalService) {

        this.typeScriptSimpleListMarkup =
            htmlEncoder.prepareHighlightedSection(this.examples.typeScriptActionButtonsListMarkup, 'typescript');
        this.htmlSimpleListMarkup =
            htmlEncoder.prepareHighlightedSection(this.examples.htmlActionButtonsListMarkup);
    }

}

export interface ExamplePerson {
    id: string;
    firstName: string;
    lastName: string;
    amount: number;
    selected?: boolean;
    deleted?: boolean;
}

