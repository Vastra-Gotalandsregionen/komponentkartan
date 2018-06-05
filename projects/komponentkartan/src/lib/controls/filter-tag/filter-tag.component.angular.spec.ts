// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

// import { FilterTagComponent } from './filter-tag.component';

// describe('[FilterTagComponent - Angular]', () => {
//   let component: FilterTagComponent;
//   let fixture: ComponentFixture<FilterTagComponent>;
//   let rootElement: DebugElement;
//   let buttonElement: DebugElement;

//   beforeEach((done) => {
//     TestBed.resetTestEnvironment();
//     TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//     TestBed.configureTestingModule({
//       declarations: [FilterTagComponent]
//     });

//     TestBed.overrideComponent(FilterTagComponent, {
//       set: {
//         templateUrl: 'filter-tag.component.html'
//       }
//     });

//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FilterTagComponent);
//       component = fixture.componentInstance;
//       rootElement = fixture.debugElement;
//       buttonElement = rootElement.query(By.css('button'));
//       fixture.detectChanges();

//       done();
//     });
//   });

//   describe('When disabled is true', () => {
//     beforeEach(() => {
//       component.disabled = true;
//       fixture.detectChanges();
//     });
//     it('button is displayed as disabled', () => {
//       expect(buttonElement.classes['button--disabled']).toBe(true);
//     });
//     it('click does not bubble', () => {
//       let clickBubbled = false;
//       const handleClick = () => clickBubbled = true;
//       rootElement.nativeElement.addEventListener('click', handleClick);
//       buttonElement.nativeElement.click();
//       rootElement.nativeElement.removeEventListener('click', handleClick);
//       expect(clickBubbled).toBe(false);
//     });
//   });

//   describe('When disabled is false', () => {
//     beforeEach(() => {
//       component.disabled = false;
//       fixture.detectChanges();
//     });
//     it('button is displayed as enabled', () => {
//       expect(buttonElement.classes['button--disabled']).toBe(false);
//     });
//     it('click bubbles', () => {
//       let clickBubbled = false;
//       const handleClick = () => clickBubbled = true;
//       rootElement.nativeElement.addEventListener('click', handleClick);
//       buttonElement.nativeElement.click();
//       rootElement.nativeElement.removeEventListener('click', handleClick);
//       expect(clickBubbled).toBe(true);
//     });
//   });

//   describe('When button is clicked', () => {
//     it('button is displayed as removing', fakeAsync(() => {
//       buttonElement.nativeElement.click();
//       fixture.detectChanges();
//       expect(buttonElement.classes['filter-tag--removing']).toBe(true);
//       tick(200);
//     }));
//     it('button is displayed as removed after delay', fakeAsync(() => {
//       buttonElement.nativeElement.click();
//       tick(200);
//       fixture.detectChanges();
//       expect(buttonElement.classes['filter-tag--removed']).toBe(true);
//     }));
//     it('remove is emitted after delay', fakeAsync(() => {
//       spyOn(component.remove, 'emit');
//       buttonElement.nativeElement.click();
//       tick(200);
//       expect(component.remove.emit).toHaveBeenCalledTimes(1);
//     }));
//     describe('and component is disabled', () => {
//       beforeEach(() => {
//         component.disabled = true;
//         fixture.detectChanges();
//       });
//       it('button is not displayed as removing', fakeAsync(() => {
//         buttonElement.nativeElement.click();
//         fixture.detectChanges();
//         expect(buttonElement.classes['filter-tag--removing']).toBe(false);
//         tick(200);
//       }));
//       it('button is not displayed as removed after delay', fakeAsync(() => {
//         buttonElement.nativeElement.click();
//         tick(200);
//         fixture.detectChanges();
//         expect(buttonElement.classes['filter-tag--removed']).toBe(false);
//       }));
//       it('remove is not emitted after delay', fakeAsync(() => {
//         spyOn(component.remove, 'emit');
//         buttonElement.nativeElement.click();
//         tick(200);
//         expect(component.remove.emit).not.toHaveBeenCalled();
//       }));
//     });
//   });
// });
