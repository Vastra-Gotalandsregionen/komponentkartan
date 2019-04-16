import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { EventEmitter, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  ListComponent, ListHeaderComponent, SortChangedArgs,
  SortDirection, ListItemComponent
} from '../../index';
import { IconComponent } from '../icon/icon.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from '../pagination/pagination.component';


describe('[ListComponent]', () => {
  let listComponent: ListComponent;
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let rootElement: DebugElement;
  let listElement: DebugElement;


  beforeEach((done) => {
    // listComponent = new ListComponent();
    // listComponent.listHeader = new ListHeaderComponent();

    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      declarations: [
        ListComponent, ListHeaderComponent, PaginationComponent, IconComponent
      ],
      imports: [
         CommonModule, BrowserAnimationsModule, FontAwesomeModule
      ]
    });
    TestBed.overrideComponent(ListComponent, {
      set: {
        templateUrl: './list.component.html'
      }
    });
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      fixture.detectChanges();

      done();
    });
  });
  describe('when header changes sort', () => {
    beforeEach(() => {
      spyOn(component.sortChanged, 'emit');
      component.ngAfterContentInit();
      component.sortChanged.emit({ direction: SortDirection.Ascending, key: 'foo' } as SortChangedArgs);
    });
    it('a sortChange event is emitted', () => {
      expect(component.sortChanged.emit).toHaveBeenCalledWith({ direction: SortDirection.Ascending, key: 'foo' });
    });
  });
  describe('when list is initialized with three items', () => {

    const childItem1 = {
      setFocusOnRow: (r) => { }, setFocusOnFirstRow: new EventEmitter(), setFocusOnLastRow: new EventEmitter(), setFocusOnPreviousRow: new EventEmitter(), setFocusOnNextRow: new EventEmitter(), setFocusOnPreviousRowContent: new EventEmitter(), setFocusOnNextRowContent: new EventEmitter(), expandedChanged: new EventEmitter<boolean>(),
      toggleExpand(forceclose = false) {
        if (!this.notInteractable) {
          this.expanded = forceclose ? false : !this.expanded;
          this.expandedChanged.emit(this.expanded);
          this.notInteractable = true;
          setTimeout(() => { this.notInteractable = false; }, 400);
        }
      }
    } as ListItemComponent;
    const childItem2 = {
      setFocusOnRow: (r) => { }, setFocusOnFirstRow: new EventEmitter(), setFocusOnLastRow: new EventEmitter(), setFocusOnPreviousRow: new EventEmitter(), setFocusOnNextRow: new EventEmitter(), setFocusOnPreviousRowContent: new EventEmitter(), setFocusOnNextRowContent: new EventEmitter(), expandedChanged: new EventEmitter<boolean>(),
      toggleExpand(forceclose = false) {
        if (!this.notInteractable) {
          this.expanded = forceclose ? false : !this.expanded;
          this.expandedChanged.emit(this.expanded);
          this.notInteractable = true;
          setTimeout(() => { this.notInteractable = false; }, 400);
        }
      }
    } as ListItemComponent;
    const childItem3 = {
      setFocusOnRow: (r) => { }, setFocusOnFirstRow: new EventEmitter(), setFocusOnLastRow: new EventEmitter(), setFocusOnPreviousRow: new EventEmitter(), setFocusOnNextRow: new EventEmitter(), setFocusOnPreviousRowContent: new EventEmitter(), setFocusOnNextRowContent: new EventEmitter(), expandedChanged: new EventEmitter<boolean>(),
      toggleExpand(forceclose = false) {
        if (!this.notInteractable) {
          this.expanded = forceclose ? false : !this.expanded;
          this.expandedChanged.emit(this.expanded);
          this.notInteractable = true;
          setTimeout(() => { this.notInteractable = false; }, 400);
        }
      }
    } as ListItemComponent;

    beforeEach(() => {
      spyOn(component.items, 'forEach').and.callFake(((callback: any) => [childItem1, childItem2, childItem3].forEach(callback)));
      spyOn(component.items, 'filter').and.callFake(((callback: any) => [childItem1, childItem2, childItem3].filter(callback)));
      spyOn(component.items, 'toArray').and.returnValue([childItem1, childItem2, childItem3]);

      spyOn(component, 'setFocusOnPreviousRow').and.callThrough();
      spyOn(component, 'setFocusOnNextRow').and.callThrough();

      component.ngAfterContentInit();
    });

    describe('and multiple expanded items is not allowed', () => {
      beforeEach(() => {
        component.allowMultipleExpandedItems = false;
        childItem1.notInteractable = false;
        childItem2.notInteractable = false;
        childItem3.notInteractable = false;
        spyOn(childItem1, 'toggleExpand').and.callThrough();
        spyOn(childItem2, 'toggleExpand').and.callThrough();
        spyOn(childItem3, 'toggleExpand').and.callThrough();
      });
      describe('and a child item is expanded', () => {
        beforeEach(() => {
          childItem1.expanded = false;
          childItem2.expanded = false;
          childItem3.expanded = false;
          childItem1.toggleExpand();
        });
        it('the other items are collapsed', () => {
          expect(childItem1.toggleExpand).toHaveBeenCalledWith();
          expect(childItem1.expanded).toBe(true);
          expect(childItem2.expanded).toBe(false);
          expect(childItem3.expanded).toBe(false);
        });
      });
      describe('and a different child item is expanded', () => {
        beforeEach(() => {
          childItem1.expanded = true;
          childItem2.expanded = false;
          childItem3.expanded = true;
          childItem2.toggleExpand();
        });
        it('the other items are collapsed', () => {
          expect(childItem2.toggleExpand).toHaveBeenCalledWith();
          expect(childItem2.expanded).toBe(true);
          expect(childItem1.toggleExpand).toHaveBeenCalledWith(true);
          expect(childItem3.toggleExpand).toHaveBeenCalledWith(true);
          expect(childItem1.expanded).toBe(false);
          expect(childItem3.expanded).toBe(false);
        });
      });
    });

    describe('and focus is on the first list-item header', () => {
      beforeEach(() => {
        spyOn(childItem3, 'setFocusOnRow').and.callThrough();
        component.setFocusOnPreviousRow(0);
      });
      it('setFocusOnPreviousRow toHaveBeenCalled ', () => {
        expect(component.setFocusOnPreviousRow).toHaveBeenCalledWith(0);

      });
      it('setFocusOnRow on the last list-item-header toHaveBeenCalled ', () => {
        expect(childItem3.setFocusOnRow).toHaveBeenCalled();
      });
    });

    describe('and focus is on the second list-item header', () => {
      beforeEach(() => {
        spyOn(childItem1, 'setFocusOnRow');
        component.setFocusOnPreviousRow(1);

      });
      it('setFocusOnPreviousRow toHaveBeenCalled ', () => {
        expect(component.setFocusOnPreviousRow).toHaveBeenCalledWith(1);

      });
      it('setFocusOnRow toHaveBeenCalled ', () => {
        expect(childItem1.setFocusOnRow).toHaveBeenCalled();
      });
    });

    describe('and focus is on the second item list-item header', () => {
      beforeEach(() => {
        spyOn(childItem3, 'setFocusOnRow');
        component.setFocusOnNextRow(1);
      });
      it('setFocusOnNextRow toHaveBeenCalled ', () => {
        expect(component.setFocusOnNextRow).toHaveBeenCalledWith(1);
      });
      it('setFocusOnRow toHaveBeenCalled ', () => {
        expect(childItem3.setFocusOnRow).toHaveBeenCalled();
      });
    });

    describe('and focus is on the last item list-item header', () => {
      beforeEach(() => {
        spyOn(childItem1, 'setFocusOnRow');
        component.setFocusOnNextRow(2);
      });
      it('setFocusOnNextRow toHaveBeenCalled ', () => {
        expect(component.setFocusOnNextRow).toHaveBeenCalledWith(2);
      });
      it('setFocusOnRow toHaveBeenCalled ', () => {
        expect(childItem1.setFocusOnRow).toHaveBeenCalled();
      });
    });

    describe('and focus is on the last item list-item content and item is not collapsed', () => {
      beforeEach(() => {
        spyOn(component, 'setFocusOnPreviousRowContent').and.callThrough();
        spyOn(childItem1, 'setFocusOnRow');
        // childItem1.collapsed = false;
        component.setFocusOnPreviousRowContent(childItem1);
      });
      it('setFocusOnNextRow toHaveBeenCalled ', () => {
        expect(component.setFocusOnPreviousRowContent).toHaveBeenCalledWith(childItem1);
      });
      xit('setFocusOnRow toHaveBeenCalled ', () => {
        expect(childItem1.setFocusOnRow).toHaveBeenCalled();
      });
    });
  });
});
