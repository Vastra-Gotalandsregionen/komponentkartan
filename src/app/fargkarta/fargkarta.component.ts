import { Component } from '@angular/core';
import { ExpandableRow } from '../../lib/index';

@Component({
    moduleId: module.id,
    selector: 'vgr-fargkarta',
    templateUrl: 'fargkarta.component.html'
})



export class FargkartaComponent {
    public claimRows: ExpandableRow<any, any>[];
    constructor() {
        this.claimRows = [
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122300200112', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122343242342', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 1223424242', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12232342342', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12232342344', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12231111222', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122312135654', payableAmount: 200, issueDate: new Date(), visits: undefined }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12230098667', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 1223654767', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12237567567', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 1223567567', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12234534w345', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122353453453', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122334534534', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new ExpandableRow<any, any>({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122334534534', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] })];
    };

}
