﻿
// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { By } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { DebugElement } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { CloseButtonComponent } from '../../controls/closeButton/closeButton.component';



// describe('TextButtonComponent', () => {
//     let component: CloseButtonComponent;
//     let fixture: ComponentFixture<CloseButtonComponent>;
//     let rootElement: DebugElement;

//     beforeEach((done) => {
//         TestBed.resetTestEnvironment();
//         TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//         TestBed.configureTestingModule({
//             declarations: [CloseButtonComponent],
//             imports: [CommonModule, FormsModule]
//         });

//         TestBed.overrideComponent(CloseButtonComponent, {
//             set: {
//                 templateUrl: 'closeButton.component.html'
//             }
//         });

//         TestBed.compileComponents().then(() => {
//             fixture = TestBed.createComponent(CloseButtonComponent);
//             component = fixture.componentInstance;
//             rootElement = fixture.debugElement;
//             fixture.detectChanges();

//             done();
//         });
//     });
//     describe('When component is initialized', () => {
//         let closeButtonElement: DebugElement;
//         beforeEach(() => {
//             closeButtonElement = rootElement.query(By.css('.lock-button'));
//         });

//         it('button is enabled', () => {
//             expect(closeButtonElement.classes['button--disabled']).toBeFalsy();
//         });

//         describe('and button is clicked', () => {

//         });

//         describe('and button is disabled', () => {
//             beforeEach(() => {
//                 component.disabled = true;
//                 fixture.detectChanges();
//             });

//             it('button is displayed as disabled', () => {
//                 expect(closeButtonElement.classes['button--disabled']).toBeTruthy();
//             });
//         });
//     });
//     describe('WCAG Tests', () => {
//         let closeButtonElement: DebugElement;
//         beforeEach(() => {
//             closeButtonElement = rootElement.query(By.css('.close-button'));
//         });
//         describe('When button is enabled', () => {
//             it('button has tab stop', () => {
//                 expect(closeButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
//             });
//             it('button aria-label is set to Stäng', () => {
//                 expect(closeButtonElement.attributes['aria-label']).toBe('lås upp');
//             });

//             // describe('and clicked', () => {
//             //     beforeEach(() => {
//             //         component.unlocked = true;
//             //         fixture.detectChanges();
//             //     });

//             //     it('button aria-label is set to lås', () => {
//             //         expect(lockButtonElement.attributes['aria-label']).toBe('lås');
//             //     });
//             //     describe('and space is pressed', () => {
//             //         it('a lockChanged event is triggered', () => {
//             //             lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
//             //             expect(component.lockChanged.emit).toHaveBeenCalledWith(true);
//             //         });
//             //         it('button is locked', () => {
//             //             lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
//             //             expect(component.unlocked).toBe(false);
//             //         });
//             //     });
//             //     describe('and Enter is pressed', () => {
//             //         it('a lockChanged event is triggered', () => {
//             //             lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
//             //             expect(component.lockChanged.emit).toHaveBeenCalledWith(true);
//             //         });
//             //         it('button is locked', () => {
//             //             lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
//             //             expect(component.unlocked).toBe(false);
//             //         });
//             //     });
//             //     describe('and a letter is pressed', () => {
//             //         it('a lockChanged event is triggered', () => {
//             //             lockButtonElement.triggerEventHandler('keydown', { keyCode: 168 } as KeyboardEvent);
//             //             expect(component.lockChanged.emit).toHaveBeenCalledTimes(0);
//             //         });
//             //         it('button is not locked', () => {
//             //             lockButtonElement.triggerEventHandler('keydown', { keyCode: 168 } as KeyboardEvent);
//             //             expect(component.unlocked).toBe(true);
//             //         });
//             //     });
//             // });
//             // describe('and button is locked', () => {
//             //     beforeEach(() => {
//             //         component.unlocked = false;
//             //         fixture.detectChanges();
//             //     });

//             //     describe('and space is pressed', () => {
//             //         it('a lockChanged Event is triggered', () => {
//             //             lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
//             //             expect(component.lockChanged.emit).toHaveBeenCalledWith(false);
//             //         });
//             //         it('button is unlocked', () => {
//             //             lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
//             //             expect(component.unlocked).toBe(true);
//             //         });

//             //         describe('and Enter is pressed', () => {
//             //             it('a lockChanged Event is triggered', () => {
//             //                 lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
//             //                 expect(component.lockChanged.emit).toHaveBeenCalledWith(false);
//             //             });
//             //             it('button is unlocked', () => {

//             //                 lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
//             //                 expect(component.unlocked).toBe(true);
//             //             });
//             //         });

//             //         describe('and a letter is pressed', () => {
//             //             it('a lockChangedEvent is not triggered', () => {
//             //                 lockButtonElement.triggerEventHandler('keydown', { keyCode: 162 } as KeyboardEvent);
//             //                 expect(component.lockChanged.emit).toHaveBeenCalledTimes(0);
//             //             });
//             //             it('button is still locked', () => {

//             //                 lockButtonElement.triggerEventHandler('keydown', { keyCode: 162 } as KeyboardEvent);
//             //                 expect(component.unlocked).toBe(false);
//             //             });
//             //         });
//             //     });

//             // });
//         });

//         describe('and button is disabled', () => {
//             beforeEach(() => {
//                 component.disabled = true;
//                 fixture.detectChanges();
//             });
//             it('the aria-disabled is set to true', () => {
//                 expect(closeButtonElement.attributes['aria-disabled']).toBeTruthy();
//             });
//             it('button has no tab stop', () => {
//                 expect(closeButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
//             });
//         });

//     });
// });
