// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement, Renderer, ElementRef, Component, QueryList } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import {
//   ListComponent,
//   ListItemComponent, ListItemHeaderComponent, ListColumnComponent, ListHeaderComponent,
//   ListItemContentComponent, ListColumnHeaderComponent
// } from '../../index';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';

// describe('ListComponent', () => {
//   let component: ListComponent;
//   let fixture: ComponentFixture<ListComponent>;
//   let rootElement: DebugElement;

//   beforeEach((done) => {
//     TestBed.resetTestEnvironment();
//     TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//     TestBed.configureTestingModule({
//       declarations: [
//         ListComponent,
//         ListHeaderComponent,
//         ListColumnHeaderComponent,
//         ListItemComponent,
//         ListItemHeaderComponent,
//         ListColumnComponent,
//         ListItemContentComponent
//       ],
//       imports: [CommonModule, BrowserAnimationsModule],
//       providers: [
//         { provide: ElementRef },
//         { provide: Renderer }]
//     });

//     TestBed.overrideComponent(ListComponent, {
//       set: {
//         templateUrl: './list.component.html'
//       }
//     });

//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(ListComponent);
//       fixture.componentInstance.listHeader = <ListHeaderComponent>fixture.debugElement.children[0].componentInstance;
//       fixture.componentInstance.items = fixture.debugElement.children[0].componentInstance as QueryList<ListItemComponent>;
//       component = fixture.componentInstance;
//       rootElement = fixture.debugElement;
//       fixture.detectChanges();
//       done();
//     });
//   });

//   describe('[ListComponent', () => {
//     describe('When notification is not set', () => {
//       it('notification is not visible', () => {
//         expect(rootElement.queryAll(By.css('.list__notification')).length).toBe(0);
//       });
//     });

//     describe('When notification is set', () => {
//       beforeEach(() => {
//         component.notification = {message: 'Detta är en notifikation', icon: 'vgr-icon-plus'};
//         fixture.detectChanges();
//       });

//       it('notification is visible', () => {
//         expect(rootElement.queryAll(By.css('.list__notification')).length).toBe(1);
//       });

//       describe('and when notification is removed', () => {
//         beforeEach(() => {
//           component.notification = null;
//           fixture.detectChanges();
//         });
//         it('notification is not visible', () => {
//           expect(rootElement.queryAll(By.css('.list__notification')).length).toBe(0);
//         });
//       });
//     });
//   });

// });
