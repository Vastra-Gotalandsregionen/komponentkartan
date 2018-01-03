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
var forms_1 = require("@angular/forms");
var FakeAComponent = (function () {
    function FakeAComponent(fb) {
        this.fb = fb;
        this.readonly = false;
        this.options123_1 = [{ displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
            { displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
            { displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian' }];
        this.options123Multi_1 = [{ displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
            { displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
            { displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian', selected: true }];
        this.options123_2 = [{ displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
            { displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
            { displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian' }];
        this.options123Multi_2 = [{ displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
            { displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
            { displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian', selected: true }];
        this.minDate = new Date(2015, 0, 1);
        this.maxDate = new Date(2016, 11, 31);
    }
    FakeAComponent.prototype.ngOnInit = function () {
        this.createForm();
    };
    FakeAComponent.prototype.createForm = function () {
        var date = new Date(2017, 11, 24);
        this.form = this.fb.group({
            control1: ['', forms_1.Validators.required],
            control2: [null, forms_1.Validators.required],
            control3: [true],
            control4: ['Två'],
            control5: ['', forms_1.Validators.required],
            control6: ['', forms_1.Validators.required]
        });
    };
    return FakeAComponent;
}());
FakeAComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vgr-fake-a',
        templateUrl: 'fake-a.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], FakeAComponent);
exports.FakeAComponent = FakeAComponent;
//# sourceMappingURL=fake-a.component.js.map