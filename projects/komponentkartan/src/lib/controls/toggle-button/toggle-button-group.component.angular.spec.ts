import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

import { ToggleButtonGroupComponent } from './toggle-button-group.component';
import { ToggleButtonComponent } from './toggle-button.component';

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-toggle-button-group>
    <vgr-toggle-button id="first">First</vgr-toggle-button>
    <vgr-toggle-button id="second">Second</vgr-toggle-button>
    <vgr-toggle-button id="third">Third</vgr-toggle-button>
  </vgr-toggle-button-group>
  `
})
export class TestComponent {}

describe('[ToggleButtonGroupComponent - Angular]', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: ToggleButtonGroupComponent;
  let rootElement: DebugElement;
  let firstToggleButton: DebugElement;
  let firstToggleButtonOuterSpan: DebugElement;
  let firstToggleButtonButton: DebugElement;
  let secondToggleButton: DebugElement;
  let secondToggleButtonOuterSpan: DebugElement;
  let secondToggleButtonButton: DebugElement;
  let thirdToggleButton: DebugElement;
  let thirdToggleButtonOuterSpan: DebugElement;
  let thirdToggleButtonButton: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ToggleButtonGroupComponent, ToggleButtonComponent, TestComponent]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      rootElement = fixture.debugElement.query(By.css('vgr-toggle-button-group'));
      component = rootElement.componentInstance;
      firstToggleButton = rootElement.query(By.css('#first'));
      firstToggleButtonOuterSpan = firstToggleButton.query(By.css('span'));
      firstToggleButtonButton = firstToggleButton.query(By.css('button'));
      secondToggleButton = rootElement.query(By.css('#second'));
      secondToggleButtonOuterSpan = secondToggleButton.query(By.css('span'));
      secondToggleButtonButton = secondToggleButton.query(By.css('button'));
      thirdToggleButton = rootElement.query(By.css('#third'));
      thirdToggleButtonOuterSpan = thirdToggleButton.query(By.css('span'));
      thirdToggleButtonButton = thirdToggleButton.query(By.css('button'));
      fixture.detectChanges();

      done();
    });
  });

  describe('When navigating with keyboard', () => {
    beforeEach(() => {
      firstToggleButton.componentInstance.focus();
    });
    describe('and pressing arrow right key', () => {
      beforeEach(() => {
        firstToggleButtonOuterSpan.triggerEventHandler('keydown', { key: 'ArrowRight' });
      });
      it('next toggle-button is focused', () => {
        expect(document.activeElement).toBe(secondToggleButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow right key in IE', () => {
      beforeEach(() => {
        firstToggleButtonOuterSpan.triggerEventHandler('keydown', { key: 'Right' });
      });
      it('next toggle-button is focused', () => {
        expect(document.activeElement).toBe(secondToggleButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow down key', () => {
      beforeEach(() => {
        firstToggleButtonOuterSpan.triggerEventHandler('keydown', { key: 'ArrowDown' });
      });
      it('next toggle-button is focused', () => {
        expect(document.activeElement).toBe(secondToggleButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow down in IE', () => {
      beforeEach(() => {
        firstToggleButtonOuterSpan.triggerEventHandler('keydown', { key: 'Down' });
      });
      it('next toggle-button is focused', () => {
        expect(document.activeElement).toBe(secondToggleButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow left key', () => {
      beforeEach(() => {
        firstToggleButtonOuterSpan.triggerEventHandler('keydown', { key: 'ArrowLeft' });
      });
      it('previous toggle-button is focused', () => {
        expect(document.activeElement).toBe(thirdToggleButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow left key in IE', () => {
      beforeEach(() => {
        firstToggleButtonOuterSpan.triggerEventHandler('keydown', { key: 'Left' });
      });
      it('previous toggle-button is focused', () => {
        expect(document.activeElement).toBe(thirdToggleButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow up key', () => {
      beforeEach(() => {
        firstToggleButtonOuterSpan.triggerEventHandler('keydown', { key: 'ArrowUp' });
      });
      it('previous toggle-button is focused', () => {
        expect(document.activeElement).toBe(thirdToggleButtonButton.nativeElement);
      });
    });
    describe('and pressing arrow up in IE', () => {
      beforeEach(() => {
        firstToggleButtonOuterSpan.triggerEventHandler('keydown', { key: 'Up' });
      });
      it('previous toggle-button is focused', () => {
        expect(document.activeElement).toBe(thirdToggleButtonButton.nativeElement);
      });
    });
  });
});
