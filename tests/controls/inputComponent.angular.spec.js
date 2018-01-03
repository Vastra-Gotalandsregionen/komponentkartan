"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var input_component_1 = require("../../component-package/controls/input/input.component");
var errorhandler_1 = require("../../component-package/services/errorhandler");
var validation_model_1 = require("../../component-package/models/validation.model");
var truncatePipe_1 = require("../../component-package/pipes/truncatePipe");
var errorMessagePipe_1 = require("../../component-package/pipes/errorMessagePipe");
require("intl/locale-data/jsonp/se-SE.js");
describe('[InputComponent]', function () {
    var component;
    var fixture;
    var rootElement;
    var validationErrorStates = validation_model_1.ValidationErrorState;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [input_component_1.InputComponent, truncatePipe_1.TruncatePipe, errorMessagePipe_1.ErrorMessagePipe],
            imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            providers: [errorhandler_1.ErrorHandler]
        });
        testing_1.TestBed.overrideComponent(input_component_1.InputComponent, {
            set: {
                templateUrl: 'input.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(input_component_1.InputComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('When initialized with invalid state', function () {
        beforeEach(function () {
            component.isInvalid = true;
            component.errorMessage = 'error';
            component.readonly = false;
            component.ngOnInit();
            component.onBlur();
            fixture.detectChanges();
        });
        it('CSS Class validation-error--active is applied', function () {
            expect(rootElement.classes['validation-error--editing']).toEqual(false);
            expect(rootElement.classes['validation-error--active']).toEqual(true);
            expect(rootElement.classes['validation-error--fixed']).toEqual(false);
        });
        it('There is an error message section', function () {
            var element = rootElement.query(platform_browser_1.By.css('.input-validation_status__message'));
            // expect(element.nativeElement.innerText).toEqual('error');
        });
        describe('When focused', function () {
            beforeEach(function () {
                component.onFocus();
                fixture.detectChanges();
            });
            it('CSS Class validation-error--editing is applied', function () {
                var element = rootElement.query(platform_browser_1.By.css('.input-validation_status__message'));
                // expect(element.nativeElement.innerText).toEqual('error');
                expect(rootElement.classes['validation-error--editing']).toEqual(true);
                expect(rootElement.classes['validation-error--active']).toEqual(false);
                expect(rootElement.classes['validation-error--fixed']).toEqual(false);
            });
            describe('When error is corrected and field is blurred', function () {
                beforeEach(function () {
                    component.isInvalid = false;
                    component.onBlur();
                    fixture.detectChanges();
                });
                it('CSS Class validation-error--fixed is applied', function () {
                    expect(rootElement.classes['validation-error--editing']).toEqual(false);
                    expect(rootElement.classes['validation-error--active']).toEqual(false);
                    expect(rootElement.classes['validation-error--fixed']).toEqual(true);
                });
            });
        });
    });
    describe('When initialized with invalid state and validate on init is true', function () {
        beforeEach(function () {
            component = fixture.componentInstance;
            component.isInvalid = true;
            component.validateOnInit = true;
            component.errorMessage = 'error';
            component.small = false;
            component.ngOnInit();
            fixture.detectChanges();
        });
        it('CSS Class validation-error--active is applied', function () {
            expect(rootElement.classes['validation-error--editing']).toEqual(false);
            expect(rootElement.classes['validation-error--active']).toEqual(true);
            expect(rootElement.classes['validation-error--fixed']).toEqual(false);
        });
        it('There is a error message section', function () {
            var element = rootElement.query(platform_browser_1.By.css('.input-validation_status__message'));
            // expect(element.nativeElement.innerText).toEqual('error');
        });
    });
    describe('When initialized with number formatting, valid state and 5 decimals', function () {
        beforeEach(function () {
            component = fixture.componentInstance;
            component.formatNumber = true;
            component.nrOfDecimals = 4;
            component.value = '1234.567340980932848';
            component.isInvalid = false;
            component.readonly = false;
            component.ngOnInit();
            component.onBlur();
            fixture.detectChanges();
        });
        it('Value and displayvalue has been formatted correctly', function () {
            expect(component.value).toEqual(1234.5673);
        });
        describe('When number formatting is off', function () {
            beforeEach(function () {
                component = new input_component_1.InputComponent(null, null);
                component.value = '1234.5673409';
                component.formatNumber = false;
                component.ngOnInit();
                component.onBlur();
                fixture.detectChanges();
            });
            it('Value is not formatted', function () {
                expect(component.value).toEqual('1234.5673409');
            });
        });
    });
});
//# sourceMappingURL=inputComponent.angular.spec.js.map