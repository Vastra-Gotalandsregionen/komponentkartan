import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

import { FilterTagGroupComponent } from './filter-tag-group.component';
import { FilterTagComponent } from './filter-tag.component';

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-filter-tag-group>
    <vgr-filter-tag id="first">First</vgr-filter-tag>
    <vgr-filter-tag id="second">Second</vgr-filter-tag>
    <vgr-filter-tag id="third">Third</vgr-filter-tag>
  </vgr-filter-tag-group>
  `
})
export class TestComponent {}

describe('[FilterTagGroupComponent - Angular]', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: FilterTagGroupComponent;
  let rootElement: DebugElement;
  let firstFilterTag: DebugElement;
  let firstFilterTagOuterSpan: DebugElement;
  let firstFilterTagButton: DebugElement;
  let secondFilterTag: DebugElement;
  let secondFilterTagOuterSpan: DebugElement;
  let secondFilterTagButton: DebugElement;
  let thirdFilterTag: DebugElement;
  let thirdFilterTagOuterSpan: DebugElement;
  let thirdFilterTagButton: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [FilterTagGroupComponent, FilterTagComponent, TestComponent]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      rootElement = fixture.debugElement.query(By.css('vgr-filter-tag-group'));
      component = rootElement.componentInstance;
      firstFilterTag = rootElement.query(By.css('#first'));
      firstFilterTagOuterSpan = firstFilterTag.query(By.css('span'));
      firstFilterTagButton = firstFilterTag.query(By.css('button'));
      secondFilterTag = rootElement.query(By.css('#second'));
      secondFilterTagOuterSpan = secondFilterTag.query(By.css('span'));
      secondFilterTagButton = secondFilterTag.query(By.css('button'));
      thirdFilterTag = rootElement.query(By.css('#third'));
      thirdFilterTagOuterSpan = thirdFilterTag.query(By.css('span'));
      thirdFilterTagButton = thirdFilterTag.query(By.css('button'));
      fixture.detectChanges();

      done();
    });
  });

  describe('When navigating with keyboard', () => {
    beforeEach(() => {
      firstFilterTag.componentInstance.focus();
    });
    describe('and pressing arrow right key', () => {
      beforeEach(() => {
        firstFilterTagOuterSpan.triggerEventHandler('keydown', { key: 'ArrowRight' });
      });
      it('next filter tag is focused', () => {
        expect(document.activeElement).toBe(secondFilterTagButton.nativeElement);
      });
    });
    describe('and pressing arrow right key in IE', () => {
      beforeEach(() => {
        firstFilterTagOuterSpan.triggerEventHandler('keydown', { key: 'Right' });
      });
      it('next filter tag is focused', () => {
        expect(document.activeElement).toBe(secondFilterTagButton.nativeElement);
      });
    });
    describe('and pressing arrow down key', () => {
      beforeEach(() => {
        firstFilterTagOuterSpan.triggerEventHandler('keydown', { key: 'ArrowDown' });
      });
      it('next filter tag is focused', () => {
        expect(document.activeElement).toBe(secondFilterTagButton.nativeElement);
      });
    });
    describe('and pressing arrow down in IE', () => {
      beforeEach(() => {
        firstFilterTagOuterSpan.triggerEventHandler('keydown', { key: 'Down' });
      });
      it('next filter tag is focused', () => {
        expect(document.activeElement).toBe(secondFilterTagButton.nativeElement);
      });
    });
    describe('and pressing arrow left key', () => {
      beforeEach(() => {
        firstFilterTagOuterSpan.triggerEventHandler('keydown', { key: 'ArrowLeft' });
      });
      it('previous filter tag is focused', () => {
        expect(document.activeElement).toBe(thirdFilterTagButton.nativeElement);
      });
    });
    describe('and pressing arrow left key in IE', () => {
      beforeEach(() => {
        firstFilterTagOuterSpan.triggerEventHandler('keydown', { key: 'Left' });
      });
      it('previous filter tag is focused', () => {
        expect(document.activeElement).toBe(thirdFilterTagButton.nativeElement);
      });
    });
    describe('and pressing arrow up key', () => {
      beforeEach(() => {
        firstFilterTagOuterSpan.triggerEventHandler('keydown', { key: 'ArrowUp' });
      });
      it('previous filter tag is focused', () => {
        expect(document.activeElement).toBe(thirdFilterTagButton.nativeElement);
      });
    });
    describe('and pressing arrow up in IE', () => {
      beforeEach(() => {
        firstFilterTagOuterSpan.triggerEventHandler('keydown', { key: 'Up' });
      });
      it('previous filter tag is focused', () => {
        expect(document.activeElement).toBe(thirdFilterTagButton.nativeElement);
      });
    });
  });
});
