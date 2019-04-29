
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../pipes/truncatePipe';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSectionComponent } from './cardSection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconComponent } from '../icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


describe('[CardSectionComponent]', () => {
  let component: CardSectionComponent;
  let fixture: ComponentFixture<CardSectionComponent>;
  let rootElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [CardSectionComponent, TruncatePipe, IconComponent],
      imports: [CommonModule, BrowserAnimationsModule, FontAwesomeModule]
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
      }),
        it('title is displayed', () => {
          const header = rootElement.query(By.css('h2'));
          expect(header.nativeElement.innerText).toBe('Section 1');
        });
    });
    describe('and header is clicked', () => {
      beforeEach(() => {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        rootElement.query(By.css('.card-section__header')).triggerEventHandler('click', null);
        jasmine.clock().tick(10);
      });
      it('section is expanded', () => {
        expect(component.expanded).toBe(true);
      });
      describe('and header is clicked again', () => {
        beforeEach(() => {
          rootElement.query(By.css('.card-section__header')).triggerEventHandler('click', null);
          jasmine.clock().tick(10);
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
    describe('header is focused and space is pressed', () => {
      beforeEach(() => {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        const keyEvent = new KeyboardEvent('keydown', {key: 'Enter'});
        const focusedElement = rootElement.query(By.css('.card-section__header'));
        Object.defineProperty(keyEvent, 'keyCode', {'value' : 32});
        Object.defineProperty(keyEvent, 'target', {'value' : focusedElement.nativeElement});
        Object.defineProperty(keyEvent, 'srcElement', {'value' : focusedElement.nativeElement});
        component.toggleExpand(keyEvent);
        jasmine.clock().tick(10);
      });
      it('section is expanded', () => {
        expect(component.expanded).toBe(true);
      });
      describe('header is focused and enter is pressed', () => {
        beforeEach(() => {
          console.log(component.expanded);
          const keyEvent = new KeyboardEvent('keydown', {key: 'Enter'});
          const focusedElement = rootElement.query(By.css('.card-section__header'));
          Object.defineProperty(keyEvent, 'keyCode', {'value' : 13});
          Object.defineProperty(keyEvent, 'target', {'value' : focusedElement.nativeElement});
          Object.defineProperty(keyEvent, 'srcElement', {'value' : focusedElement.nativeElement});
          component.toggleExpand(keyEvent);
          jasmine.clock().tick(10);
        });

        it('section is compressed', () => {
          expect(component.expanded).toBe(false);
        });
      });
    });
  });
});
