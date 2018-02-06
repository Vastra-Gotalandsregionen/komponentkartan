import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Renderer, ElementRef, Component, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ListComponent,
  ListItemComponent, ListItemHeaderComponent, ListColumnComponent, ListHeaderComponent,
  ListItemContentComponent, ListItemJqeuryHelper, ListColumnHeaderComponent
} from '../../index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let rootElement: DebugElement;
  const jqueryHelper: ListItemJqeuryHelper = new ListItemJqeuryHelper();

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        ListHeaderComponent,
        ListColumnHeaderComponent,
        ListItemComponent,
        ListItemHeaderComponent,
        ListColumnComponent,
        ListItemContentComponent
      ],
      imports: [CommonModule],
      providers: [
        { provide: ElementRef },
        { provide: Renderer },
        { provide: ListItemJqeuryHelper, useValue: jqueryHelper }]
    });

    TestBed.overrideComponent(ListComponent, {
      set: {
        template: `
        <vgr-list-header>
          <vgr-list-column-header>
          </vgr-list-column-header>
        </vgr-list-header>
        <vgr-list-item>
          <vgr-list-item-header>
            <vgr-list-column></vgr-list-column>
          </vgr-list-item-header>
          <vgr-list-item-content>
              <span> Mer information</span>
          </vgr-list-item-content>
        < /vgr-list-item>
        `
      }
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ListComponent);
      fixture.componentInstance.listHeader = <ListHeaderComponent>fixture.debugElement.children[0].componentInstance;
      fixture.componentInstance.items = fixture.debugElement.children[0].componentInstance as QueryList<ListItemComponent>;
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;

      fixture.detectChanges();
      done();
    });
  });

  describe('[ListComponent', () => {
    describe('When initialized', () => {
      beforeEach(() => {
        component.ngAfterContentInit();
      });

      it('the component has the list-item class', () => {
        expect(rootElement.classes['list']).toBe(true);
      });

      describe('when vgr-list-item-header is clicked', () => {
        beforeEach(() => {
          let header: DebugElement;
          header = rootElement.children[0];
          spyOn(component.items.first.setFocusOnFirstRow, 'emit');
          header.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
        });

        it('component is expanded', () => {
          expect(component.items.first.listItemHeader.expandedChanged).toBe(true);
        });
      });
    });
  });

});
