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
var notificationIcon_model_1 = require("../../component-package/models/notificationIcon.model");
var modalService_1 = require("../../component-package/services/modalService");
var modalService_2 = require("../../component-package/services/modalService");
var list_column_header_component_1 = require("../../component-package/controls/list/list-column-header.component");
var ListsComponent = (function () {
    function ListsComponent(modalService) {
        this.modalService = modalService;
        this.sortDirections = list_column_header_component_1.SortDirection;
        this.cardRow = new expandableRow_model_1.ExpandableRow('Foo');
        this.initialDate = new Date();
        this.initialFromDate = new Date(2017, 1, 20);
        this.initialToDate = new Date(2017, 10, 20);
        this.actionPanelVisible = true;
        this.grossAmount = 15000;
        this.taxPercent = 32;
    }
    Object.defineProperty(ListsComponent.prototype, "netAmount", {
        get: function () {
            if (isNaN(this.grossAmount) || isNaN(this.taxPercent)) {
                return NaN;
            }
            else {
                return this.grossAmount - ((this.taxPercent / 100) * this.grossAmount);
            }
        },
        enumerable: true,
        configurable: true
    });
    ListsComponent.prototype.loadItems = function () {
        this.claimRows = [
            new expandableRow_model_1.ExpandableRow({ identification: '1ZVFf9023874sdpaföj', invoiceId: 'INV 122300200112', payableAmount: 2500, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '2ZVFf9023874sdpaföj', invoiceId: 'INV 122343242342', payableAmount: 199, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '3ZVFf9023874sdpaföj', invoiceId: 'INV 1223424242', payableAmount: 239, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '4ZVFf9023874sdpaföj', invoiceId: 'INV 12232342342', payableAmount: 5417, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '5ZVFf9023874sdpaföj', invoiceId: 'INV 12232342344', payableAmount: 999, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '6ZVFf9023874sdpaföj', invoiceId: 'INV 12231111222', payableAmount: 12, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '7ZVFf9023874sdpaföj', invoiceId: 'INV 122312135654', payableAmount: 4500, issueDate: new Date(), visits: undefined }),
            new expandableRow_model_1.ExpandableRow({ identification: '8ZVFf9023874sdpaföj', invoiceId: 'INV 12230098667', payableAmount: 4500, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '9ZVFf9023874sdpaföj', invoiceId: 'INV 1223654767', payableAmount: 1990, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '10ZVFf9023874sdpaföj', invoiceId: 'INV 12237567567', payableAmount: 1221, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '11ZVFf9023874sdpaföj', invoiceId: 'INV 1223567567', payableAmount: 31232, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '12ZVFf9023874sdpaföj', invoiceId: 'INV 12234534w345', payableAmount: 3232, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '13ZVFf9023874sdpaföj', invoiceId: 'INV 122353453453', payableAmount: 321, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '14ZVFf9023874sdpaföj', invoiceId: 'INV 122334534534', payableAmount: 122, issueDate: new Date(), visits: [1, 2, 3] }),
            new expandableRow_model_1.ExpandableRow({ identification: '15ZVFf9023874sdpaföj', invoiceId: 'INV 122334534534', payableAmount: 43, issueDate: new Date(), visits: [1, 2, 3] })
        ];
    };
    ListsComponent.prototype.onDeleted = function (item) {
        console.log('deleted', item);
    };
    ListsComponent.prototype.cardSaved = function () {
        this.cardUnlocked = false;
        this.cardRow.notifyOnCollapse('Användaren sparades', notificationIcon_model_1.NotificationIcon.OkGreen);
    };
    ListsComponent.prototype.cardCancelled = function () {
        this.cardUnlocked = false;
        this.cardRow.notifyOnCollapse('Åtgärden avbröts', notificationIcon_model_1.NotificationIcon.Ok);
    };
    ListsComponent.prototype.onCardUnlocked = function () {
        this.cardUnlocked = true;
    };
    ListsComponent.prototype.onSelectRowChanged = function (row, checked) {
        console.log('select row: ', row, checked);
        row.previewObject.selected = checked;
    };
    ListsComponent.prototype.onDeleteRow = function (row) {
        this.removeRow(row);
    };
    ListsComponent.prototype.removeRow = function (row) {
        this.modalService.openDialog('Ta bort raden', 'Vill du verkligen ta bort raden med identification ' + row.previewObject.identification + '?', new modalService_2.ModalButtonConfiguration('Ja', function () {
            row.notifyOnRemove(row.previewObject.identification + ' togs bort', notificationIcon_model_1.NotificationIcon.Ok);
            row.previewObject.selected = false;
            row.previewObject.deleted = true;
        }), new modalService_2.ModalButtonConfiguration('Nej', function () { }));
    };
    ListsComponent.prototype.getSelectedRows = function () {
        return this.claimRows && this.claimRows.filter(function (r) { return r.previewObject.selected; }).length;
    };
    return ListsComponent;
}());
ListsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vgr-lists',
        templateUrl: 'lists.component.html'
    }),
    __metadata("design:paramtypes", [modalService_1.ModalService])
], ListsComponent);
exports.ListsComponent = ListsComponent;
//# sourceMappingURL=lists.component.js.map