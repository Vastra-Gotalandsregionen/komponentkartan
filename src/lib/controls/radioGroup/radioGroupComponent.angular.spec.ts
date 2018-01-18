
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioGroupComponent } from '../../controls/radioGroup/radioGroup.component';
import { SelectableItem } from '../../models/selectableItem.model';

describe('SaveCancelComponent', () => {
    let component: RadioGroupComponent;
    let fixture: ComponentFixture<RadioGroupComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [RadioGroupComponent],
            imports: [CommonModule]
        });

        TestBed.overrideComponent(RadioGroupComponent, {
            set: {
                templateUrl: 'radioGroup.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(RadioGroupComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When initialized with options', () => {
        let selectedChangedSpy: jasmine.Spy;
        beforeEach(() => {
            selectedChangedSpy = spyOn(component.selectedChanged, 'emit');
            component.options = [
                { value: 'PÅ', displayName: 'Per Åkerberg' } as SelectableItem<any>,
                { value: 'SH', displayName: 'Sofia Hejdenberg' } as SelectableItem<any>,
                { value: 'CB', displayName: 'Caroline Bornsjö' } as SelectableItem<any>,
            ] as SelectableItem<any>[];
            fixture.detectChanges();
        });
        it('options are displayed', () => {
            const visibleOptions = rootElement.queryAll(By.css('.radio-button'));
            expect(visibleOptions.map(x => x.properties['title'])).toEqual(['Per Åkerberg', 'Sofia Hejdenberg', 'Caroline Bornsjö']);
        });
        it('no option is selected', () => {
            const selectedOptions = rootElement.queryAll(By.css('.radio-button--checked'));
            expect(selectedOptions.length).toEqual(0);
        });
        describe('and an option is clicked', () => {
            beforeEach(() => {
                selectedChangedSpy.calls.reset();
                const optionToSelect = rootElement.queryAll(By.css('.radio-button')).filter(x => x.properties['title'] === 'Caroline Bornsjö')[0];
                optionToSelect.triggerEventHandler('click', null);
                fixture.detectChanges();
            });
            it('the option is selected', () => {
                const selectedOptions = rootElement.queryAll(By.css('.radio-button--checked'));
                expect(selectedOptions.map(x => x.properties['title'])).toEqual(['Caroline Bornsjö']);
            });
            it('an selectedChanged event is emitted', () => {
                expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.radiogroupItems[2].value);
            });

            describe('and the already selected option is clicked again', () => {
                beforeEach(() => {
                    selectedChangedSpy.calls.reset();
                    const optionToSelect = rootElement.queryAll(By.css('.radio-button')).filter(x => x.properties['title'] === 'Caroline Bornsjö')[0];
                    optionToSelect.triggerEventHandler('click', null);
                    fixture.detectChanges();
                });
                it('the option is still selected', () => {
                    const selectedOptions = rootElement.queryAll(By.css('.radio-button--checked'));
                    expect(selectedOptions.map(x => x.properties['title'])).toEqual(['Caroline Bornsjö']);
                });
                it('no selectedChanged event is emitted', () => {
                    expect(component.selectedChanged.emit).toHaveBeenCalledTimes(0);
                });
            });
        });

        describe('and an option is selected by pressing the Space key', () => {
            beforeEach(() => {
                selectedChangedSpy.calls.reset();
                const optionToSelect = rootElement.queryAll(By.css('.radio-button')).filter(x => x.properties['title'] === 'Caroline Bornsjö')[0];
                optionToSelect.triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } } as KeyboardEvent);
                fixture.detectChanges();
            });
            it('the option is selected', () => {
                const selectedOptions = rootElement.queryAll(By.css('.radio-button--checked'));
                expect(selectedOptions.map(x => x.properties['title'])).toEqual(['Caroline Bornsjö']);
            });
            it('an selectedChanged event is emitted', () => {
                expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.radiogroupItems[2].value);
            });
        });

        describe('and an option is selected by pressing the Enter key', () => {
            beforeEach(() => {
                selectedChangedSpy.calls.reset();
                const optionToSelect = rootElement.queryAll(By.css('.radio-button')).filter(x => x.properties['title'] === 'Caroline Bornsjö')[0];
                optionToSelect.triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
                fixture.detectChanges();
            });
            it('the option is selected', () => {
                const selectedOptions = rootElement.queryAll(By.css('.radio-button--checked'));
                expect(selectedOptions.map(x => x.properties['title'])).toEqual(['Caroline Bornsjö']);
            });
            it('an selectedChanged event is emitted', () => {
                expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.radiogroupItems[2].value);
            });
        });

    });

    describe('When initialized with one selected option', () => {
        beforeEach(() => {
            spyOn(component.selectedChanged, 'emit');
            component.options = [
                { value: 'PÅ', displayName: 'Per Åkerberg' } as SelectableItem<any>,
                { value: 'SH', displayName: 'Sofia Hejdenberg', selected: true } as SelectableItem<any>,
                { value: 'CB', displayName: 'Caroline Bornsjö' } as SelectableItem<any>,
            ] as SelectableItem<any>[];
            fixture.detectChanges();
        });
        it('options are displayed', () => {
            const visibleOptions = rootElement.queryAll(By.css('.radio-button'));
            expect(visibleOptions.map(x => x.properties['title'])).toEqual(['Per Åkerberg', 'Sofia Hejdenberg', 'Caroline Bornsjö']);
        });
        it('the pre-selected option is selected', () => {
            const selectedOptions = rootElement.queryAll(By.css('.radio-button--checked'));
            expect(selectedOptions.map(x => x.properties['title'])).toEqual(['Sofia Hejdenberg']);
        });
    });

    describe('When initialized with two selected options', () => {
        beforeEach(() => {
            spyOn(component.selectedChanged, 'emit');
            component.options = [
                { value: 'PÅ', displayName: 'Per Åkerberg' } as SelectableItem<any>,
                { value: 'SH', displayName: 'Sofia Hejdenberg', selected: true } as SelectableItem<any>,
                { value: 'CB', displayName: 'Caroline Bornsjö', selected: true } as SelectableItem<any>,
            ] as SelectableItem<any>[];
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it('options are displayed', () => {
            const visibleOptions = rootElement.queryAll(By.css('.radio-button'));
            expect(visibleOptions.map(x => x.properties['title'])).toEqual(['Per Åkerberg', 'Sofia Hejdenberg', 'Caroline Bornsjö']);
        });
        it('the first pre-selected option is selected', () => {
            const selectedOptions = rootElement.queryAll(By.css('.radio-button--checked'));
            expect(selectedOptions.map(x => x.properties['title'])).toEqual(['Sofia Hejdenberg']);
        });
        it('an selectedChanged event is emitted', () => {
            expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.radiogroupItems[1].value);
        });
    });

    describe('When initialized with a disabled option', () => {
        beforeEach(() => {
            spyOn(component.selectedChanged, 'emit');
            component.options = [
                { value: 'PÅ', displayName: 'Per Åkerberg', disabled: true } as SelectableItem<any>,
                { value: 'SH', displayName: 'Sofia Hejdenberg' } as SelectableItem<any>,
                { value: 'CB', displayName: 'Caroline Bornsjö' } as SelectableItem<any>,
            ] as SelectableItem<any>[];
            fixture.detectChanges();
        });
        it('options are displayed', () => {
            const visibleOptions = rootElement.queryAll(By.css('.radio-button'));
            expect(visibleOptions.map(x => x.properties['title'])).toEqual(['Per Åkerberg', 'Sofia Hejdenberg', 'Caroline Bornsjö']);
        });
        it('the disabled option is displayed as disabled', () => {
            const disabledOptions = rootElement.queryAll(By.css('.radio-button--disabled'));
            expect(disabledOptions.map(x => x.properties['title'])).toEqual(['Per Åkerberg']);
        });


        describe('and the disabled option is clicked', () => {
            beforeEach(() => {
                const optionToSelect = rootElement.queryAll(By.css('.radio-button')).filter(x => x.properties['title'] === 'Per Åkerberg')[0];
                optionToSelect.triggerEventHandler('click', null);
                fixture.detectChanges();
            });
            it('the option is not selected', () => {
                const selectedOptions = rootElement.queryAll(By.css('.radio-button--checked'));
                expect(selectedOptions.length).toEqual(0);
            });
        });
    });



    describe('WCAG: When initialized with options', () => {
        let selectedChangedSpy: jasmine.Spy;
        let firstOption: DebugElement;
        let visibleOptions: DebugElement[];
        beforeEach(() => {
            selectedChangedSpy = spyOn(component.selectedChanged, 'emit');
            component.options = [
                { disabled: false, selected: false, value: 'PÅ', displayName: 'Per Åkerberg' } as SelectableItem<string>,
                { disabled: false, selected: false, value: 'SH', displayName: 'Sofia Hejdenberg' } as SelectableItem<string>,
                { disabled: false, selected: false, value: 'CB', displayName: 'Caroline Bornsjö' } as SelectableItem<string>,
            ] as SelectableItem<any>[];


            fixture.detectChanges();
            firstOption = rootElement.queryAll(By.css('.radio-button__icon'))[0];

            visibleOptions = rootElement.queryAll(By.css('.radio-button__icon'));
        });

        it('no option is selected', () => {
            const selectedOptions = rootElement.queryAll(By.css('.radio-button--checked'));
            expect(selectedOptions.length).toEqual(0);
        });
        it('The radiogroup has role radiogroup.', () => {
            expect(rootElement.attributes['role']).toBe('radiogroup');
        });
        it('The radiobuttons has role radio.', () => {
            expect(firstOption.attributes['role']).toBe('radio');
        });

        describe('The aria-labelledby is defined on the radiobutton ', () => {
            it('radiobutton has a label with a guid', () => {
                const labelElement = rootElement.query(By.css('.radio-button__text'));
                expect(labelElement.nativeElement.id).toBe(component.radiogroupItems[0].ariaid);
            });
            it('radiobutton is associated with the label', () => {
                expect(firstOption.attributes['aria-labelledby']).toBe(component.radiogroupItems[0].ariaid);
            });
            it('radiobuttons labels are unique', () => {
                expect(component.radiogroupItems[0].ariaid).not.toBe(component.radiogroupItems[1].ariaid);
            });
        });

        describe('Aria-check state is set ', () => {

            describe('when checked', () => {
                beforeEach(() => {
                    component.radiogroupItems[0].selected = true;
                    fixture.detectChanges();
                });
                it('the radiobutton element has state aria-checked set to true', () => {
                    expect(firstOption.attributes['aria-checked']).toBe('true');
                })

                describe('when not checked', () => {
                    beforeEach(() => {
                        component.radiogroupItems[0].selected = false;
                        fixture.detectChanges();

                    });
                    it('the radiobutton element has state aria-checked set to false', () => {
                        expect(firstOption.attributes['aria-checked']).toBe('false');
                    })
                });

            })

        });

        describe('Tabstop is set', () => {

            describe('When no option is selected', () => {
                it('first element has tabstop', () => {
                    for (let i = 0; i < visibleOptions.length; i++) {
                        expect(visibleOptions[i].properties['tabIndex']).toBe(i === 0 ? '0' : '-1');
                    }
                });

                describe('When second option is selected', () => {
                    describe('the second option is the first tabstop', () => {
                        let selectedOptions: DebugElement[];
                        beforeEach(() => {
                            const optionToSelect = rootElement.queryAll(By.css('.radio-button')).filter(x => x.properties['title'] === 'Sofia Hejdenberg')[0];

                            optionToSelect.triggerEventHandler('click', null);
                            fixture.detectChanges();
                            selectedOptions = rootElement.queryAll(By.css('.radio-button--checked .radio-button__icon'));

                        });
                        it('the option is  selected', () => {

                            expect(selectedOptions.length).toEqual(1);
                        });
                        it('the selected option has tabstop', () => {
                            expect(selectedOptions[0].properties['tabIndex']).toBe('0');
                        });
                        it('only the second option has first tabstop', () => {
                            for (let i = 0; i < visibleOptions.length; i++) {
                                expect(visibleOptions[i].properties['tabIndex']).toBe(i === 1 ? '0' : '-1');
                            }
                        });

                    });
                });

            });
        });
        describe('When first option is selected', () => {
            let selectedOption: DebugElement[];
            let optionToSelect: DebugElement;


            beforeEach(() => {
                //   spyOn(component, 'setFocus');
                optionToSelect = rootElement.queryAll(By.css('.radio-button')).filter(x => x.properties['title'] === 'Per Åkerberg')[0];

                optionToSelect.triggerEventHandler('click', null);
                fixture.detectChanges();
                selectedOption = rootElement.queryAll(By.css('.radio-button--checked .radio-button__icon'));



            });
            it('the option is  selected', () => {
                expect(selectedOption[0].parent.properties['title']).toEqual('Per Åkerberg');

            });
            // describe('and right key is pressed', () => {
            //     beforeEach(() => {
            //         selectedOption[0].parent.triggerEventHandler('keydown', { keyCode: 39, preventDefault: function () { } } as KeyboardEvent);
            //         fixture.detectChanges();
            //         console.log(rootElement.children);
            //         selectedOption = rootElement.queryAll(By.css('.radio-button--checked .radio-button__icon'));


            //     });
            //     it('next option is selected', () => {
            //         expect(selectedOption.length).toBe(1);
            //     });

            //     it('next option is selected', () => {
            //         expect(selectedOption[0].parent.properties['title']).toEqual('Sofia Hejdenberg');
            //     });
            //     // it('setFous has been called', () => {
            //     //     expect(component.setFocus).toHaveBeenCalled();
            //     // })
            // })
        });
    });
});
