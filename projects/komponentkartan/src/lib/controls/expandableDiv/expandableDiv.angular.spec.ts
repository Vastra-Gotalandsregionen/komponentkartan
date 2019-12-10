
import { ExpandableDivComponent } from './expandableDiv.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from '../icon/icon.component';
import { IconModule } from '../icon/icon.module';

describe('[ExpandableDivComponent - Angular]', () => {

  let component: ExpandableDivComponent;
  let fixture: ComponentFixture<ExpandableDivComponent>;
  let rootElement: DebugElement;
  let header: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ExpandableDivComponent, IconComponent],
      imports: [CommonModule, BrowserAnimationsModule, FontAwesomeModule, IconModule]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ExpandableDivComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      fixture.detectChanges();
      done();
    });
  });

  describe('When component is initialized with expanded = true', () => {
    beforeEach(() => {
      component.expanded = true;
      fixture.detectChanges();
    });

    it('content is expanded', () => {
      const content = rootElement.query(By.css('.expandable-div-content'));
      expect(content.styles['height']).not.toBe('0px');
    });

    describe('and header is clicked', () => {
      beforeEach(() => {
        header = rootElement.query(By.css('.expandable-div-header'));
        header.triggerEventHandler('click', null);
        fixture.detectChanges();
      });

      it('content is collapsed', () => {
        const content = rootElement.query(By.css('.expandable-div-content'));
        expect(content.nativeElement.style.height).toBe('0px');
      });
    });
  });

  describe('When component is initialized', () => {
    it('content is collapsed', () => {
      const content = rootElement.query(By.css('.expandable-div-content'));
      expect(content.nativeElement.style.height).toBe('0px');
    });

    describe('and header is clicked', () => {
      beforeEach(() => {
        header = rootElement.query(By.css('.expandable-div-header'));
        header.triggerEventHandler('click', null);
        fixture.detectChanges();
      });

      it('content is expanded', () => {
      const content = rootElement.query(By.css('.expandable-div-content'));
      expect(content.styles['height']).not.toBe('0px');
    });
    });
  });
});