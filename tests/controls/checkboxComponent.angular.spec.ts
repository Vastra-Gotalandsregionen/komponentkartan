
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxComponent } from '../../component-package/controls/checkbox/checkbox.component';


describe('SaveCancelComponent', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;
    let rootElement: DebugElement;
    let checkbox: DebugElement;
    let checkedChangedSpy: jasmine.Spy;


    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [CheckboxComponent],
            imports: [CommonModule]
        });

        TestBed.overrideComponent(CheckboxComponent, {
            set: {
                templateUrl: './checkbox.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(CheckboxComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            checkbox = rootElement.query(By.css('.checkbox'));
            checkedChangedSpy = spyOn(component.checkedChanged, 'emit');
            fixture.detectChanges();

            done();
        });
    });
    describe('When initialized', () => {
        it('checkbox is not checked', () => {
            expect(checkbox.classes['checkbox--checked']).toBe(false);
        });
        it('checkbox is enabled', () => {
            expect(checkbox.classes['checkbox--disabled']).toBe(false);
        });
    });

    describe('When initialized as checked', () => {
        beforeEach(() => {
            component.checked = true;
            fixture.detectChanges();
        });
        it('checkbox is not checked', () => {
            expect(checkbox.classes['checkbox--checked']).toBe(true);
        });
        it('checkbox is enabled', () => {
            expect(checkbox.classes['checkbox--disabled']).toBe(false);
        });
    });

    describe('When initialized as disabled', () => {
        beforeEach(() => {
            component.disabled = true;
            fixture.detectChanges();
        });
        it('checkbox is not checked', () => {
            expect(checkbox.classes['checkbox--checked']).toBe(false);
        });
        it('checkbox is disabled', () => {
            expect(checkbox.classes['checkbox--disabled']).toBe(true);
        });

        describe('and checked', () => {
            beforeEach(() => {
                component.checked = true;
                fixture.detectChanges();
            });
            it('checkbox is checked', () => {
                expect(checkbox.classes['checkbox--checked']).toBe(true);
            });
            it('checkbox is disabled', () => {
                expect(checkbox.classes['checkbox--disabled']).toBe(true);
            });
        });
    });

    describe('When checkbox is clicked ', () => {
        beforeEach(() => {
            checkbox.triggerEventHandler('click', null);
            fixture.detectChanges();
        });
        it('checkbox is checked', () => {
            expect(component.checked).toBe(true);

            expect(checkbox.classes['checkbox--checked']).toBe(true);
        });
        it('checked event is emitted', () => {
            expect(component.checkedChanged.emit).toHaveBeenCalledWith(true);
        });

        describe('And checkbox is clicked again', () => {
            beforeEach(() => {
                checkedChangedSpy.calls.reset();
                checkbox.triggerEventHandler('click', null);
                fixture.detectChanges();
            });
            it('checkbox is unchecked', () => {
                expect(component.checked).toBe(false);
                expect(checkbox.classes['checkbox--checked']).toBe(false);
            });
            it('checked event is emitted', () => {
                expect(component.checkedChanged.emit).toHaveBeenCalledWith(false);
            });
        });
    });

    describe('When checkbox is triggered with the SPACE key ', () => {
        beforeEach(() => {
            checkbox.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
            fixture.detectChanges();
        });
        it('checkbox is checked', () => {
            expect(component.checked).toBe(true);
            expect(checkbox.classes['checkbox--checked']).toBe(true);
        });
        it('checked event is emitted', () => {
            expect(component.checkedChanged.emit).toHaveBeenCalledWith(true);
        });
    });

    describe('When checkbox is triggered with the ENTER key ', () => {
        beforeEach(() => {
            checkbox.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
            fixture.detectChanges();
        });
        it('checkbox is checked', () => {
            expect(component.checked).toBe(true);
            expect(checkbox.classes['checkbox--checked']).toBe(true);
        });
        it('checked event is emitted', () => {
            expect(component.checkedChanged.emit).toHaveBeenCalledWith(true);
        });
    });

    describe('WCAG compatibility', () => {
        let checkboximage: DebugElement;
        beforeEach(() => {
            checkboximage = rootElement.query(By.css('.checkbox__image'));
            fixture.detectChanges();
        });
        it('The checkbox has role checkbox.', () => {
            expect(checkboximage.attributes['role']).toBe('checkbox');
        });

        describe('The checkbox has an accessible label, preferably provided by a visible label associated using aria-labelledby', () => {
            it('checkbox has a label with an id', () => {
                const labelElement = rootElement.query(By.css('.checkbox__label'));
                expect(labelElement.nativeElement.id).toBe('checkbox-label');
            });
            it('checkbox is associated with the label', () => {
                expect(checkboximage.attributes['aria-labelledby']).toBe('checkbox-label');
            });
        });

        it('When checked, the checkbox element has state aria-checked set to true', () => {
            component.checked = true;
            fixture.detectChanges();
            expect(checkboximage.attributes['aria-checked']).toBe('true');
        });

        it('When not checked, it has state aria-checked set to false', () => {
            component.checked = false;
            fixture.detectChanges();
            expect(checkboximage.attributes['aria-checked']).toBe('false');
        });

    });
});
