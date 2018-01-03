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
var cityService_1 = require("./cityService");
var forms_1 = require("@angular/forms");
var errorhandler_1 = require("../../component-package/services/errorhandler");
require("rxjs/add/observable/of");
require("rxjs/add/operator/map");
var InputFieldsComponent = (function () {
    function InputFieldsComponent(fb, errorHandler) {
        this.fb = fb;
        this.errorHandler = errorHandler;
        this.value = 81273128739;
        this.formErrors = {
            'control1': '',
            'control2': '',
            'control3': '',
            'control4': '',
            'control5': '',
            'control7': '',
            'control8': '',
            'control9': '',
            'control10': '',
            'control13': '',
            'control14': ''
        };
        this.validationMessages = {
            'control1': {
                'invalidNumber': 'Ange ett nummer!',
            },
            'control2': {
                'invalidNumber': 'Minst 3 siffror tack!',
                'minlength': 'Minst 3 siffror tack!'
            },
            'control3': {
                'invalidNumber': 'Ange ett nummer!',
            },
            'control4': {
                'invalidNumber': 'Ange ett nummer!',
            },
            'control5': {
                'invalidNumber': 'Ange ett nummer!',
            },
            'control7': {
                'pattern': 'Ange exakt tre VERSALER.',
            },
            'control8': {
                'pattern': ' Ange mellan 2-6 tecken.'
            },
            'control9': {
                'invalidNumber': 'Ange ett giltigt heltal.'
            },
            'control10': {
                'required': 'Detta är ett längre meddelande som visas när något blir väldigt väldigt fel'
            },
            'control13': {
                'invalidCity': 'Felaktig stad',
            },
            'control14': {
                'email': 'Felaktig e-post'
            }
        };
        this.cityName = 'Houstons';
        this.amount1 = 15000;
        this.amount2 = -25.5;
        this.percentValue = 0.02;
        this.kmValue = 11;
        this.intValue = 0;
        this.isSmall = false;
    }
    InputFieldsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        var validateOnInit = true;
        this.isSmall = true;
        if (validateOnInit) {
            this.errorHandler.getErrorMessagesReactiveForms(this.formErrors, this.validationMessages, this.form, this.isSmall);
        }
        this.form.valueChanges
            .subscribe(function (data) {
            _this.errorHandler.getErrorMessagesReactiveForms(_this.formErrors, _this.validationMessages, _this.form, _this.isSmall);
        });
    };
    InputFieldsComponent.prototype.createForm = function () {
        this.form = this.fb.group({
            control1: [this.amount1, validateNumber],
            control2: [this.amount2, [validateNumber, forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            control3: [this.percentValue, validateNumber],
            control4: [this.kmValue, validateNumber],
            control5: [this.numericValue, validateNumber],
            control6: [],
            control7: ['', [forms_1.Validators.pattern('^[A-Z,Å,Ä,Ö]{3}$'), forms_1.Validators.required]],
            control8: ['', [forms_1.Validators.pattern('^.{2,6}$'), forms_1.Validators.required]],
            control9: [this.intValue, validateNumber],
            control10: ['', forms_1.Validators.required],
            control11: ['Visar värdet utan ram'],
            control12: [],
            control13: [this.cityName, forms_1.Validators.required, validateAsyncCityName()],
            control14: ['', forms_1.Validators.email]
        });
    };
    InputFieldsComponent.prototype.formatNumericValue = function (value) {
        return isNaN(value) ? 'Inget' : value;
    };
    InputFieldsComponent.prototype.toggleInputType = function (option) {
        if (option.displayName === 'Stor')
            this.isSmall = false;
        else
            this.isSmall = true;
    };
    InputFieldsComponent.prototype.validateNumberControl1 = function (value) {
        var pattern = '^[-,−]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$';
        var regexp = new RegExp(pattern);
        if (regexp.test(value)) {
            return true;
        }
        return false;
    };
    return InputFieldsComponent;
}());
InputFieldsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vgr-input-fields',
        templateUrl: 'inputFields.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, errorhandler_1.ErrorHandler])
], InputFieldsComponent);
exports.InputFieldsComponent = InputFieldsComponent;
function validateAsyncCityName() {
    var service = new cityService_1.CityService();
    return function (control) {
        return service.getAsyncCities().map(function (cities) {
            return cities.filter(function (x) { return x.city === control.value; }).length > 0 ? null : { 'invalidCity': { value: control.value } };
        });
    };
}
function validateCityName(control) {
    var service = new cityService_1.CityService();
    var allCities = service.getCities();
    if (allCities.filter(function (x) { return x.city === control.value; }).length > 0) {
        return null;
    }
    return { invalidCity: true };
}
function validateNumber(control) {
    var pattern = '^[-,−]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$';
    var regexp = new RegExp(pattern);
    if (regexp.test(control.value)) {
        return null;
    }
    return { invalidNumber: true };
}
//# sourceMappingURL=inputFields.component.js.map