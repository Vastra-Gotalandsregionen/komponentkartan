import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { TabButtonGroupComponent } from './tab-button-group.component';
import { TabButtonComponent } from './tab-button.component';

@Component({
  selector: 'vgr-tab-button-group-test',
  template: `
  <vgr-tab-button-group>
    <vgr-tab-button id="first" tabId="first">First</vgr-tab-button>
    <vgr-tab-button id="second" tabId="second">Second</vgr-tab-button>
    <vgr-tab-button id="third" tabId="third">Third</vgr-tab-button>
  </vgr-tab-button-group>
  `
})
export class TestComponent {}

describe('TabButtonGroupComponent', () => {
  let component: TabButtonGroupComponent;
  let fixture: ComponentFixture<TestComponent>;
  let rootElement: DebugElement;
  let firstTabButton: DebugElement;
  let firstTabButtonOuterSpan: DebugElement;
  let firstTabButtonButton: DebugElement;
  let secondTabButton: DebugElement;
  let secondTabButtonOuterSpan: DebugElement;
  let secondTabButtonButton: DebugElement;
  let thirdTabButton: DebugElement;
  let thirdTabButtonOuterSpan: DebugElement;
  let thirdTabButtonButton: DebugElement;


  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [TabButtonGroupComponent, TabButtonComponent, TestComponent]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      rootElement = fixture.debugElement.query(By.css('vgr-tab-button-group'));
      component = rootElement.componentInstance;
      firstTabButton = rootElement.query(By.css('#first'));
      firstTabButtonOuterSpan = firstTabButton.query(By.css('span'));
      firstTabButtonButton = firstTabButton.query(By.css('button'));
      secondTabButton = rootElement.query(By.css('#second'));
      secondTabButtonOuterSpan = secondTabButton.query(By.css('span'));
      secondTabButtonButton = secondTabButton.query(By.css('button'));
      thirdTabButton = rootElement.query(By.css('#third'));
      thirdTabButtonOuterSpan = thirdTabButton.query(By.css('span'));
      thirdTabButtonButton = thirdTabButton.query(By.css('button'));
      fixture.detectChanges();

      done();
    });
  });

  describe('When navigating with keyboard', () => {
    beforeEach(() => {
      firstTabButton.componentInstance.focus();
    });
    describe('and pressing arrow right key', () => {
      beforeEach(() => {
        firstTabButtonOuterSpan.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      });
      it('next Tab-button is focused', () => {
        expect(document.activeElement).toBe(secondTabButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow right key in IE', () => {
      beforeEach(() => {
        firstTabButtonOuterSpan.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
      });
      it('next Tab-button is focused', () => {
        expect(document.activeElement).toBe(secondTabButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow down key', () => {
      beforeEach(() => {
        firstTabButtonOuterSpan.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      });
      it('next Tab-button is focused', () => {
        expect(document.activeElement).toBe(secondTabButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow down in IE', () => {
      beforeEach(() => {
        firstTabButtonOuterSpan.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
      });
      it('next Tab-button is focused', () => {
        expect(document.activeElement).toBe(secondTabButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow left key', () => {
      beforeEach(() => {
        firstTabButtonOuterSpan.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      });
      it('previous Tab-button is focused', () => {
        expect(document.activeElement).toBe(thirdTabButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow left key in IE', () => {
      beforeEach(() => {
        firstTabButtonOuterSpan.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Left' }));
      });
      it('previous Tab-button is focused', () => {
        expect(document.activeElement).toBe(thirdTabButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow up key', () => {
      beforeEach(() => {
        firstTabButtonOuterSpan.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      });
      it('previous Tab-button is focused', () => {
        expect(document.activeElement).toBe(thirdTabButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow up in IE', () => {
      beforeEach(() => {
        firstTabButtonOuterSpan.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Up' }));
      });
      it('previous Tab-button is focused', () => {
        expect(document.activeElement).toBe(thirdTabButtonButton.nativeElement);
      });
    });
  });
});
