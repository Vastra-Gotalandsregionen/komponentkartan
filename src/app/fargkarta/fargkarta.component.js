"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var expandableRow_model_1 = require("../../component-package/models/expandableRow.model");
var FargkartaComponent = (function () {
    function FargkartaComponent() {
        this.claimRows = [
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122300200112', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122343242342', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 1223424242', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12232342342', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12232342344', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12231111222', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122312135654', payableAmount: 200, issueDate: new Date(), visits: undefined }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12230098667', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 1223654767', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12237567567', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 1223567567', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 12234534w345', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122353453453', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122334534534', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: 'ZVFf9023874sdpaföjou', invoiceId: 'INV 122334534534', payableAmount: 200, issueDate: new Date(), visits: [1, 2, 3] })
        ];
    }
    ;
    return FargkartaComponent;
}());
FargkartaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vgr-fargkarta',
        templateUrl: 'fargkarta.component.html'
    }),
    __metadata("design:paramtypes", [])
], FargkartaComponent);
exports.FargkartaComponent = FargkartaComponent;
//# sourceMappingURL=fargkarta.component.js.map