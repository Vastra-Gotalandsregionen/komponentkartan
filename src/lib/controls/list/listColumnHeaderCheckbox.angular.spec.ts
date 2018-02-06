
// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CheckboxComponent } from '../checkbox/checkbox.component';
// import { ListColumnHeaderCheckboxComponent } from './list-column-header-checkbox.component';


// describe('ListColumnHeaderCheckboxComponent', () => {
//     let component: ListColumnHeaderCheckboxComponent;
//     let fixture: ComponentFixture<ListColumnHeaderCheckboxComponent>;
//     let rootElement: DebugElement;
//     let checkbox: DebugElement;
//     let checkedChangedSpy: jasmine.Spy;

//     beforeEach((done) => {
//         TestBed.resetTestEnvironment();
//         TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//         TestBed.configureTestingModule({
//             declarations: [ListColumnHeaderCheckboxComponent, CheckboxComponent],
//             imports: [CommonModule]
//         });

//         TestBed.overrideComponent(ListColumnHeaderCheckboxComponent, {
//             set: {
//                 templateUrl: './list-column-header-checkbox.component.html'
//             }
//         });

//         TestBed.compileComponents().then(() => {
//             fixture = TestBed.createComponent(ListColumnHeaderCheckboxComponent);
//             component = fixture.componentInstance;
//             component.text = 'Markera mig';
//             rootElement = fixture.debugElement;
//             checkbox = rootElement.query(By.css('.checkbox'));
//             checkedChangedSpy = spyOn(component.checkedChanged, 'emit');
//             fixture.detectChanges();
//             done();
//         });
//     });
//     describe('When initialized', () => {

//         it('checkbox is not checked', () => {
//             expect(checkbox.classes['checkbox--checked']).toBe(false);
//             expect(checkbox.classes['checkbox--disabled']).toBe(false);
//         });
//         it('checkbox is enabled', () => {
//             expect(checkbox.classes['checkbox--disabled']).toBe(false);
//         });
//         it('checkbox has correct label "Markera mig"', () => {
//             const label = checkbox.query(By.css('label')).nativeElement;
//             expect(label.innerText).toBe('Markera mig');
//         });
//     });

//     describe('When initialized and checked', () => {
//         beforeEach(() => {
//             component.checked = true;
//             fixture.detectChanges();
//         });
//         it('checkbox is checked', () => {
//             expect(checkbox.classes['checkbox--checked']).toBe(true);
//         });
//         it('checkbox is enabled', () => {
//             expect(checkbox.classes['checkbox--disabled']).toBe(false);
//         });
//     });

//     describe('Checkbox is initialized unchecked and then clicked', () => {
//         beforeEach(() => {
//             component.checked = false;
//             checkedChangedSpy.calls.reset();
//             checkbox.triggerEventHandler('click', null);
//             fixture.detectChanges();
//         });
//         it('checkbox is checked', () => {
//             expect(component.checked).toBe(true);
//             expect(checkbox.classes['checkbox--checked']).toBe(true);
//         });
//         it('checked event is emitted', () => {
//             expect(component.checkedChanged.emit).toHaveBeenCalledWith(true);
//         });

//         describe('Checkbox is clicked again', () => {
//             beforeEach(() => {

//                 checkbox.triggerEventHandler('click', null);
//                 fixture.detectChanges();
//             });
//             it('checkbox is checked', () => {
//                 expect(component.checked).toBe(false);
//                 expect(checkbox.classes['checkbox--checked']).toBe(false);
//             });
//             it('checked event is emitted', () => {
//                 expect(component.checkedChanged.emit).toHaveBeenCalledWith(false);
//             });
//         });
//     });
// });
