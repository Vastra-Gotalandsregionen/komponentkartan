import {
  ListComponent, ListHeaderComponent, SortChangedArgs,
  SortDirection, ListItemComponent
} from '../../index';
import { EventEmitter } from '@angular/core';


describe('[ListComponent]', () => {
  let listComponent: ListComponent;

  beforeEach(() => {
    listComponent = new ListComponent();
    listComponent.listHeader = new ListHeaderComponent();
  });
  describe('when header changes sort', () => {
    beforeEach(() => {
      spyOn(listComponent.sortChanged, 'emit');
      listComponent.ngAfterContentInit();
      listComponent.listHeader.sortChanged.emit({ direction: SortDirection.Ascending, key: 'foo' } as SortChangedArgs);
    });
    it('a sortChange event is emitted', () => {
      expect(listComponent.sortChanged.emit).toHaveBeenCalledWith({ direction: SortDirection.Ascending, key: 'foo' });
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
      spyOn(listComponent.items, 'forEach').and.callFake(((callback: any) => [childItem1, childItem2, childItem3].forEach(callback)));
      spyOn(listComponent.items, 'filter').and.callFake(((callback: any) => [childItem1, childItem2, childItem3].filter(callback)));
      spyOn(listComponent.items, 'toArray').and.returnValue([childItem1, childItem2, childItem3]);

      spyOn(listComponent, 'setFocusOnPreviousRow').and.callThrough();
      spyOn(listComponent, 'setFocusOnNextRow').and.callThrough();

      listComponent.ngAfterContentInit();
    });

    describe('and multiple expanded items is not allowed', () => {
      beforeEach(() => {
        listComponent.allowMultipleExpandedItems = false;
        childItem1.notInteractable = false;
        childItem2.notInteractable = false;
        childItem3.notInteractable = false;
        childItem1.expanded = false;
        childItem2.expanded = false;
        childItem3.expanded = false;
        spyOn(childItem1, 'toggleExpand').and.callThrough();
        spyOn(childItem2, 'toggleExpand').and.callThrough();
        spyOn(childItem3, 'toggleExpand').and.callThrough();
      });
      describe('and a child item is expanded', () => {
        beforeEach(() => {
          childItem1.toggleExpand();
        });
        it('the other items are collapsed', () => {
          expect(childItem1.toggleExpand).toHaveBeenCalled();
          expect(childItem1.expanded).toBe(true);
          expect(childItem2.expanded).toBe(false);
          expect(childItem3.expanded).toBe(false);
        });
        describe('and a different child item is expanded', () => {
          beforeEach(() => {
            childItem1.expanded = false;
            childItem2.expanded = false;
            childItem3.expanded = true;
            childItem2.toggleExpand();
          });
          it('the other items are collapsed', () => {
            expect(childItem3.toggleExpand).toHaveBeenCalledWith(true);
            expect(childItem2.toggleExpand).toHaveBeenCalled();
            expect(childItem2.expanded).toBe(true);
            expect(childItem1.expanded).toBe(false);
            expect(childItem3.expanded).toBe(false);
          });
        });
      });
    });

    describe('and focus is on the first list-item header', () => {
      beforeEach(() => {
        spyOn(childItem3, 'setFocusOnRow').and.callThrough();
        listComponent.setFocusOnPreviousRow(0);

      });
      it('setFocusOnPreviousRow toHaveBeenCalled ', () => {
        expect(listComponent.setFocusOnPreviousRow).toHaveBeenCalledWith(0);

      });
      it('setFocusOnRow on the last list-item-header toHaveBeenCalled ', () => {
        expect(childItem3.setFocusOnRow).toHaveBeenCalled();
      });
    });

    describe('and focus is on the second list-item header', () => {
      beforeEach(() => {
        spyOn(childItem1, 'setFocusOnRow');
        listComponent.setFocusOnPreviousRow(1);

      });
      it('setFocusOnPreviousRow toHaveBeenCalled ', () => {
        expect(listComponent.setFocusOnPreviousRow).toHaveBeenCalledWith(1);

      });
      it('setFocusOnRow toHaveBeenCalled ', () => {
        expect(childItem1.setFocusOnRow).toHaveBeenCalled();
      });
    });

    describe('and focus is on the second item list-item header', () => {
      beforeEach(() => {
        spyOn(childItem3, 'setFocusOnRow');
        listComponent.setFocusOnNextRow(1);
      });
      it('setFocusOnNextRow toHaveBeenCalled ', () => {
        expect(listComponent.setFocusOnNextRow).toHaveBeenCalledWith(1);
      });
      it('setFocusOnRow toHaveBeenCalled ', () => {
        expect(childItem3.setFocusOnRow).toHaveBeenCalled();
      });
    });

    describe('and focus is on the last item list-item header', () => {
      beforeEach(() => {
        spyOn(childItem1, 'setFocusOnRow');
        listComponent.setFocusOnNextRow(2);
      });
      it('setFocusOnNextRow toHaveBeenCalled ', () => {
        expect(listComponent.setFocusOnNextRow).toHaveBeenCalledWith(2);
      });
      it('setFocusOnRow toHaveBeenCalled ', () => {
        expect(childItem1.setFocusOnRow).toHaveBeenCalled();
      });
    });

    describe('and focus is on the last item list-item content and item is not collapsed', () => {
      beforeEach(() => {
        spyOn(listComponent, 'setFocusOnPreviousRowContent').and.callThrough();
        spyOn(childItem1, 'setFocusOnRow');
        // childItem1.collapsed = false;
        listComponent.setFocusOnPreviousRowContent(childItem1);
      });
      it('setFocusOnNextRow toHaveBeenCalled ', () => {
        expect(listComponent.setFocusOnPreviousRowContent).toHaveBeenCalledWith(childItem1);
      });
      xit('setFocusOnRow toHaveBeenCalled ', () => {
        expect(childItem1.setFocusOnRow).toHaveBeenCalled();
      });
    });
  });
});
