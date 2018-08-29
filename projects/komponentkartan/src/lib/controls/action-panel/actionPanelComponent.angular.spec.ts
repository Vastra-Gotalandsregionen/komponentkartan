
// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { By } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { DebugElement, ElementRef, ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { ActionPanelComponent } from './action-panel.component';
// import { CloseButtonComponent } from '../close-button/close-button.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('ActionPanelComponent', () => {
//     let component: ActionPanelComponent;
//     let fixture: ComponentFixture<ActionPanelComponent>;
//     let rootElement: DebugElement;
//     beforeEach((done) => {
//         TestBed.resetTestEnvironment();
//         TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//         TestBed.configureTestingModule({
//             declarations: [ActionPanelComponent, CloseButtonComponent],
//             imports: [CommonModule, FormsModule, BrowserAnimationsModule],
//             providers: [
//                 { provide: ElementRef },
//                 { provide: ChangeDetectorRef }]
//         });
//         TestBed.overrideComponent(ActionPanelComponent, {
//             set: {
//                 templateUrl: 'action-panel.component.html'
//             }
//         });

//         TestBed.overrideComponent(CloseButtonComponent, {
//             set: {
//                 templateUrl: '../close-button/close-button.component.html'
//             }
//         });

//         TestBed.compileComponents().then(() => {
//             fixture = TestBed.createComponent(ActionPanelComponent);
//             component = fixture.componentInstance;
//             rootElement = fixture.debugElement;
//             fixture.detectChanges();

//             done();
//         });
//     });
//     describe('When component is initialized', () => {
//         let titleElement: DebugElement;
//         let closeButton: DebugElement;
//         beforeEach(() => {
//             component.title = 'MyTitle';
//             fixture.detectChanges();
//         });
//         it('title is set', () => {
//             titleElement = rootElement.query(By.css('.action-panel__title'));
//             expect(titleElement.nativeElement.innerText).toBe('MyTitle');
//         });
//         it('close button is not visible', () => {
//             closeButton = rootElement.query(By.css('.close-button'));
//             expect(closeButton).toBeNull();
//         });
//         it('panel is collapsed', () => {
//             expect(component.expanded).toBeUndefined();
//         });
//         describe('with a close button', () => {
//             beforeEach(() => {
//                 component.showCloseButton = true;
//                 fixture.detectChanges();
//             });

//             it('close button is visible', () => {
//                 closeButton = rootElement.query(By.css('.close-button'));
//                 expect(closeButton).toBeDefined();
//             });
//         });
//         describe('the panel is expanded', () => {
//             beforeEach(() => {
//                 spyOn(component.expandedChanged, 'emit');
//                 jasmine.clock().uninstall();
//                 jasmine.clock().install();
//                 component.expanded = true;
//                 component.expansionSpeed = 'fast';
//                 fixture.detectChanges();
//                 jasmine.clock().tick(1000);
//             });

//             it('expandedChanged has been called', () => {
//                 expect(component.expandedChanged.emit).toHaveBeenCalled();
//             });
//             it('component is not collapsed', () => {
//                 expect(component.collapsed).toBe(false);
//             });
//             it('height is set to auto', () => {
//                 expect(rootElement.nativeElement.style.height).toBe('auto');
//             });
//             it('height is set to 0px', () => {
//                 expect(rootElement.nativeElement.style.overflow).toBe('visible');
//             });
//             describe('the panel is collapsed', () => {
//                 beforeEach(() => {
//                     component.expanded = false;
//                     fixture.detectChanges();
//                     jasmine.clock().tick(100);
//                 });
//                 it('expandedChanged has been called', () => {
//                     expect(component.expandedChanged.emit).toHaveBeenCalled();
//                 });
//                 it('component is collapsed', () => {
//                     expect(component.collapsed).toBe(true);
//                 });
//                 it('height is set to 0px', () => {
//                     expect(rootElement.nativeElement.style.height).toBe('0px');
//                 });
//                 it('height is set to 0px', () => {
//                     expect(rootElement.nativeElement.style.overflow).toBe('hidden');
//                 });
//             });
//         });
//         describe('the panel is deleted', () => {
//             beforeEach(() => {
//                 spyOn(component.expandedChanged, 'emit');
//                 component.deleted = true;
//                 component.expanded = true;
//                 fixture.detectChanges();
//             });

//             it('the panel is not expanded since it is deleted', () => {
//                 expect(component.expandedChanged.emit).not.toHaveBeenCalled();
//             });
//         });
//         describe('the panel is not interactable', () => {
//             beforeEach(() => {
//                 spyOn(component.expandedChanged, 'emit');
//                 component.notInteractable = true;
//                 component.expanded = true;
//                 fixture.detectChanges();
//             });

//             it('the panel is not expanded since it is not interactabvle', () => {
//                 expect(component.expandedChanged.emit).not.toHaveBeenCalled();
//             });
//         });
//         describe('page header height is set', () => {
//             it('height is set on element', () => {
//                 // component.setPageHeaderHeight(100);
//                 expect(rootElement.nativeElement.style.top).toBe('100px');
//             });
//         });
//         describe('expansion speed is set to fast', () => {
//             it('animation delay is set to 300', () => {
//                 component.expansionSpeed = 'fast';
//                 fixture.detectChanges();
//                 expect(component.animationDelayMs).toBe(300);
//             });
//         });
//         describe('expansion speed is set to normal', () => {
//             it('animation delay is set to 600', () => {
//                 component.expansionSpeed = 'normal';
//                 fixture.detectChanges();
//                 expect(component.animationDelayMs).toBe(600);
//             });
//         });
//         describe('expansion speed is set to slow', () => {
//             it('animation delay is set to 1000', () => {
//                 component.expansionSpeed = 'slow';
//                 fixture.detectChanges();
//                 expect(component.animationDelayMs).toBe(1000);
//             });
//         });
//     });
// });
