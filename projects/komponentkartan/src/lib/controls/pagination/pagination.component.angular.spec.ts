import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, provideZoneChangeDetection, NgModule } from '@angular/core';

import { PaginationComponent } from './pagination.component';

@NgModule({ providers: [ provideZoneChangeDetection() ] })
export class ZoneChangeDetectionModule {}


describe('[PaginationComponent - Angular]', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let rootElement: DebugElement;
  let paginationElement: DebugElement;
  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment([ZoneChangeDetectionModule, BrowserDynamicTestingModule], platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
});
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(PaginationComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      paginationElement = rootElement.query(By.css('pagination'));
      fixture.detectChanges();

      done();
    });
  });
});