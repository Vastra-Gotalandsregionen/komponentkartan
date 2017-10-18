
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { TruncatePipe } from '../../component-package/pipes/truncatePipe';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSectionComponent } from '../../component-package/controls/card/cardSection.component';

describe('[CardSectionComponent]', () => {
    let component: CardSectionComponent;
    let fixture: ComponentFixture<CardSectionComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [CardSectionComponent, TruncatePipe],
            imports: [CommonModule]
        });

        TestBed.overrideComponent(CardSectionComponent, {
            set: {
                templateUrl: './cardSection.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(CardSectionComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When component is initialized', () => {
        it('component has class card-section', () => {
            expect(rootElement.classes['card-section']).toBe(true);
        });
        it('readonly is set to true', () => {
            expect(component.readonly).toBe(true);
        });
        describe('and title is set', () => {
            beforeEach(() => {
                component.title = 'Section 1';
                fixture.detectChanges();
            })
            it('title is displayed', () => {
                const header = rootElement.query(By.css('h2'));
                expect(header.nativeElement.innerText).toBe('Section 1');
            });
        });
        describe('and header is clicked', () => {
            beforeEach(() => {
                rootElement.query(By.css('.card-section__header')).triggerEventHandler('click', null);
            });
            it('section is expanded', () => {
                expect(component.expanded).toBe(true);
            });
            describe('and header is clicked again', () => {
                beforeEach(() => {
                    rootElement.query(By.css('.card-section__header')).triggerEventHandler('click', null);
                });
                it('section is collapsed', () => {
                    expect(component.expanded).toBe(false);
                });
            });
        });
        describe('and section is expanded', () => {
            beforeEach(() => {
                component.expanded = true;
                fixture.detectChanges();
            });
            it('expanded class is set', () => {
                expect(rootElement.classes['card-section--expanded']).toBe(true);
            });
            it('expanded is true', () => {
                expect(component.expanded).toBe(true);
            });
            describe('and section is collapsed', () => {
                beforeEach(() => {
                    component.expanded = false;
                    fixture.detectChanges();
                });
                it('expanded class is not set', () => {
                    expect(rootElement.classes['card-section--expanded']).toBe(false);
                });
                it('expanded is false', () => {
                    expect(component.expanded).toBe(false);
                });
            });
        });
    });
});
