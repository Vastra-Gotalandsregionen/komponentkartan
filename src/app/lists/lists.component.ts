import { Component, EventEmitter, Output, AfterContentInit, ContentChild } from '@angular/core';
import {
    ExpandableRow, RowNotification,
    NotificationType, ModalService, ModalButtonConfiguration,
    SortDirection, SortChangedArgs, ListHeaderComponent
} from '../../lib/index';
import { setTimeout } from 'core-js/library/web/timers';

@Component({
    moduleId: module.id,
    selector: 'vgr-lists',
    templateUrl: 'lists.component.html'
})
export class ListsComponent {
    sortDirections = SortDirection;
    actionPanelVisible: boolean;
    public cardUnlocked: boolean;
    public cardRow: ExpandableRow<string, string> = new ExpandableRow<string, string>('Foo');
    get netAmount(): number {
        if (isNaN(this.grossAmount) || isNaN(this.taxPercent)) {
            return NaN;
        } else {
            return this.grossAmount - ((this.taxPercent / 100) * this.grossAmount);
        }
    }
    public grossAmount: number;
    public taxPercent: number;
    public selectedDate: Date;

    public initialDate: Date = new Date();
    public initialFromDate: Date = new Date(2017, 1, 20);
    public initialToDate: Date = new Date(2017, 10, 20);

    public claimRows: ExpandableRow<any, any>[];

    panelNotification = { icon: 'vgr-icon-message', message: 'Exempeltext notifiering', type: NotificationType.Permanent } as RowNotification;

    constructor(private modalService: ModalService) {
        this.actionPanelVisible = true;
        this.grossAmount = 15000;
        this.taxPercent = 32;
    }

    loadItems() {
        this.claimRows = [
            new ExpandableRow<any, any>({ identification: '1ZVFf9023874sdpaföj', invoiceId: 'INV 122300200112', payableAmount: 2500, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '2ZVFf9023874sdpaföj', invoiceId: 'INV 122343242342', payableAmount: 199, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '3ZVFf9023874sdpaföj', invoiceId: 'INV 1223424242', payableAmount: 239, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '4ZVFf9023874sdpaföj', invoiceId: 'INV 12232342342', payableAmount: 5417, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '5ZVFf9023874sdpaföj', invoiceId: 'INV 12232342344', payableAmount: 999, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '6ZVFf9023874sdpaföj', invoiceId: 'INV 12231111222', payableAmount: 12, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '7ZVFf9023874sdpaföj', invoiceId: 'INV 122312135654', payableAmount: 4500, issueDate: new Date(), visits: undefined }),
            new ExpandableRow<any, any>({ identification: '8ZVFf9023874sdpaföj', invoiceId: 'INV 12230098667', payableAmount: 4500, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '9ZVFf9023874sdpaföj', invoiceId: 'INV 1223654767', payableAmount: 1990, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '10ZVFf9023874sdpaföj', invoiceId: 'INV 12237567567', payableAmount: 1221, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '11ZVFf9023874sdpaföj', invoiceId: 'INV 1223567567', payableAmount: 31232, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '12ZVFf9023874sdpaföj', invoiceId: 'INV 12234534w345', payableAmount: 3232, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '13ZVFf9023874sdpaföj', invoiceId: 'INV 122353453453', payableAmount: 321, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '14ZVFf9023874sdpaföj', invoiceId: 'INV 122334534534', payableAmount: 122, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: '15ZVFf9023874sdpaföj', invoiceId: 'INV 122334534534', payableAmount: 43, issueDate: new Date(), visits: [1, 2, 3] })];

        this.claimRows[0].notification = { message: 'Permanentrad skall alltid visas', icon: 'vgr-icon-exclamation--red', type: NotificationType.Permanent } as RowNotification;
    }

    onDeleted(item: any) {
        console.log('deleted', item);
    }

    cardSaved() {
        this.cardUnlocked = false;
        this.cardRow.notifyOnCollapse('Användaren sparades', 'vgr-icon-ok-check-green');
    }

    cardCancelled() {
        this.cardUnlocked = false;
        this.cardRow.notifyOnCollapse('Åtgärden avbröts', 'vgr-icon-ok-check');
    }

    onCardUnlocked() {
        this.cardUnlocked = true;
    }

    onSelectRowChanged(row: ExpandableRow<ExamplePerson, ExamplePerson>, checked: boolean) {
        console.log('select row: ', row, checked);
        row.previewObject.selected = checked;
    }

    onDeleteRow(row: ExpandableRow<any, any>) {
        this.removeRow(row);
    }


    removeRow(row: ExpandableRow<any, any>) {
        this.modalService.openDialog('Ta bort raden', 'Vill du verkligen ta bort raden med identification ' + row.previewObject.identification + '?',
            new ModalButtonConfiguration('Ja', () => {
                row.notifyOnRemove(row.previewObject.identification + ' togs bort', 'vgr-icon-exclamation--red');
                row.previewObject.selected = false;
                row.previewObject.deleted = true;
            }),
            new ModalButtonConfiguration('Nej', () => { }));
    }

    getSelectedRows(): number {
        return this.claimRows && this.claimRows.filter(r => r.previewObject.selected).length;
    }

}

export interface ExamplePerson {
    id: string;
    firstName: string;
    lastName: string;
    organisations: string[];
    canBeDeleted: boolean;
    deleted: boolean;
    selected: boolean;
}


