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
var index_1 = require("../../component-package/controls/index");
var index_2 = require("../../component-package/services/index");
var index_3 = require("../../component-package/models/index");
var ListColumnsComponent = (function () {
    function ListColumnsComponent(modalService) {
        this.modalService = modalService;
    }
    ListColumnsComponent.prototype.ngOnInit = function () {
        this.loadExamplePersonWithUnitData();
    };
    ListColumnsComponent.prototype.loadData = function () {
        this.peopleRows = [
            new index_3.ExpandableRow({ id: '1', firstName: 'Git', lastName: 'Hubsson', amount: 125000 }),
            new index_3.ExpandableRow({ id: '2', firstName: 'Adam', lastName: 'Lind', amount: 235000 }),
            new index_3.ExpandableRow({ id: '3', firstName: 'Bjarne', lastName: 'Chi', amount: 25000 }),
            new index_3.ExpandableRow({ id: '4', firstName: 'Carola', lastName: 'Bengtsson', amount: 720000 }),
            new index_3.ExpandableRow({ id: '5', firstName: 'Erik', lastName: 'Karlsson', amount: 401200 }),
        ];
    };
    ListColumnsComponent.prototype.loadExamplePersonWithUnitData = function () {
        this.peopleWithUnitRows = [
            new index_3.ExpandableRow({
                id: '1', firstName: 'Git', lastName: 'Hubsson', amount: 125000,
                unitname: 'BVC & Mödravården Mölndal', unitcode: '23111', hsaid: 'SE2321000131-E000000011851', committee: '67 - Göteborgs hälso- och sjukvårdsnämnden', owner: 'Stefan Larsson'
            }),
            new index_3.ExpandableRow({
                id: '2', firstName: 'Adam', lastName: 'Lind', amount: 235000,
                unitname: 'BVC & Mödravården Mölndal', unitcode: '23111', hsaid: 'SE2321000131-E000000011851', committee: '67 - Göteborgs hälso- och sjukvårdsnämnden', owner: 'Stefan Larsson'
            }),
            new index_3.ExpandableRow({
                id: '3', firstName: 'Bjarne', lastName: 'Chi', amount: 25000,
                unitname: 'BVC & Mödravården Mölndal', unitcode: '23111', hsaid: 'SE2321000131-E000000011851', committee: '67 - Göteborgs hälso- och sjukvårdsnämnden', owner: 'Stefan Larsson'
            }),
            new index_3.ExpandableRow({
                id: '4', firstName: 'Carola', lastName: 'Bengtsson', amount: 720000,
                unitname: 'BVC & Mödravården Mölndal', unitcode: '23111', hsaid: 'SE2321000131-E000000011851', committee: '67 - Göteborgs hälso- och sjukvårdsnämnden', owner: 'Stefan Larsson'
            }),
            new index_3.ExpandableRow({
                id: '5', firstName: 'Erik', lastName: 'Karlsson', amount: 401200,
                unitname: 'BVC & Mödravården Mölndal', unitcode: '23111', hsaid: 'SE2321000131-E000000011851', committee: '67 - Göteborgs hälso- och sjukvårdsnämnden', owner: 'Stefan Larsson'
            }),
        ];
    };
    ListColumnsComponent.prototype.onSelectRowChanged = function (row, checked) {
        row.previewObject.selected = checked;
    };
    ListColumnsComponent.prototype.onDeleteRow = function (row) {
        this.removeRow(row);
    };
    ListColumnsComponent.prototype.onDeleted = function (item) {
        console.log('deleted', item);
    };
    ListColumnsComponent.prototype.removeRow = function (row) {
        this.modalService.openDialog('Ta bort raden', 'Vill du verkligen ta bort ' + row.previewObject.firstName + '?', new index_2.ModalButtonConfiguration('Ja', function () {
            row.notifyOnRemove(row.previewObject.firstName + ' togs bort', index_3.NotificationIcon.Ok);
            row.previewObject.selected = false;
            row.previewObject.deleted = true;
            /*
              Remove for real...
            */
        }), new index_2.ModalButtonConfiguration('Nej', function () { }));
    };
    ListColumnsComponent.prototype.getSelectedRows = function () {
        if (!this.peopleRows) {
            return 0;
        }
        else {
            return this.peopleRows && this.peopleRows.filter(function (r) { return r.previewObject.selected; }).length;
        }
    };
    ListColumnsComponent.prototype.onSortChanged = function (event) {
        if (event.key === 'selected') {
            if (event.direction === index_1.SortDirection.Ascending) {
                this.peopleRows = this.peopleRows.sort(function (x, y) {
                    return (x.previewObject.selected === y.previewObject.selected) ? 0 : x.previewObject.selected ? -1 : 1;
                });
            }
            else {
                this.peopleRows = this.peopleRows.sort(function (x, y) {
                    return (x.previewObject.selected === y.previewObject.selected) ? 0 : y.previewObject.selected ? -1 : 1;
                });
            }
        }
        else {
            this.peopleRows = this.peopleRows.sort(function (row1, row2) {
                return row1.previewObject[event.key] > row2.previewObject[event.key] ?
                    (event.direction === index_1.SortDirection.Ascending ? 1 : -1) :
                    row1.previewObject[event.key] < row2.previewObject[event.key] ?
                        (event.direction === index_1.SortDirection.Ascending ? -1 : 1) : 0;
            });
        }
    };
    return ListColumnsComponent;
}());
ListColumnsComponent = __decorate([
    core_1.Component({
        selector: 'vgr-list-columns-example',
        templateUrl: './list-columns.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [index_2.ModalService])
], ListColumnsComponent);
exports.ListColumnsComponent = ListColumnsComponent;
//# sourceMappingURL=list-columns.component.js.map