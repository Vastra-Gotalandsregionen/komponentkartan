"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var truncatePipe_1 = require("../../component-package/pipes/truncatePipe");
var common_1 = require("@angular/common");
var cardSection_component_1 = require("../../component-package/controls/card/cardSection.component");
describe('[CardSectionComponent]', function () {
    var component;
    var fixture;
    var rootElement;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [cardSection_component_1.CardSectionComponent, truncatePipe_1.TruncatePipe],
            imports: [common_1.CommonModule]
        });
        testing_1.TestBed.overrideComponent(cardSection_component_1.CardSectionComponent, {
            set: {
                templateUrl: './cardSection.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(cardSection_component_1.CardSectionComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('When component is initialized', function () {
        it('component has class card-section', function () {
            expect(rootElement.classes['card-section']).toBe(true);
        });
        it('readonly is set to true', function () {
            expect(component.readonly).toBe(true);
        });
        describe('and title is set', function () {
            beforeEach(function () {
                component.title = 'Section 1';
                fixture.detectChanges();
            });
            it('title is displayed', function () {
                var header = rootElement.query(platform_browser_1.By.css('h2'));
                expect(header.nativeElement.innerText).toBe('Section 1');
            });
        });
        describe('and header is clicked', function () {
            beforeEach(function () {
                rootElement.query(platform_browser_1.By.css('.card-section__header')).triggerEventHandler('click', null);
            });
            it('section is expanded', function () {
                expect(component.expanded).toBe(true);
            });
            describe('and header is clicked again', function () {
                beforeEach(function () {
                    rootElement.query(platform_browser_1.By.css('.card-section__header')).triggerEventHandler('click', null);
                });
                it('section is collapsed', function () {
                    expect(component.expanded).toBe(false);
                });
            });
        });
        describe('and section is expanded', function () {
            beforeEach(function () {
                component.expanded = true;
                fixture.detectChanges();
            });
            it('expanded class is set', function () {
                expect(rootElement.classes['card-section--expanded']).toBe(true);
            });
            it('expanded is true', function () {
                expect(component.expanded).toBe(true);
            });
            describe('and section is collapsed', function () {
                beforeEach(function () {
                    component.expanded = false;
                    fixture.detectChanges();
                });
                it('expanded class is not set', function () {
                    expect(rootElement.classes['card-section--expanded']).toBe(false);
                });
                it('expanded is false', function () {
                    expect(component.expanded).toBe(false);
                });
            });
        });
    });
});
//# sourceMappingURL=cardSectionComponent.angular.spec.js.map