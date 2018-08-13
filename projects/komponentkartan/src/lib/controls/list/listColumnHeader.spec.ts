import { ListColumnHeaderComponent, SortDirection } from '../../controls/list/list-column-header.component';

describe('[ListColumnHeaderComponent]', () => {
  let component: ListColumnHeaderComponent;

  beforeEach(() => {
    component = new ListColumnHeaderComponent();
  });


  describe('When initialized,', () => {
    it('classes is set', () => {
      expect(component.classes).toBe('list__column-header flex-column flex-column--1 column--align-left');
    });
    it('the sortdirection is none', () => {
      expect(component.sortDirection).toBe(SortDirection.None);
    });
    describe('and clicked', () => {
      beforeEach(() => {
        component.changeSort();
      });
      it('the sortdirection is Ascending', () => {
        expect(component.sortDirection).toBe(SortDirection.Ascending);
      });
      describe('and clicked again', () => {
        beforeEach(() => {
          component.changeSort();
        });
        it('the sortdirection is Descending', () => {
          expect(component.sortDirection).toBe(SortDirection.Descending);
        });
        describe('and clicked for the last time', () => {
          beforeEach(() => {
            component.changeSort();
          });
          it('the sortdirection is Ascending', () => {
            expect(component.sortDirection).toBe(SortDirection.Ascending);
          });
        });
      });
    });
  });

  describe('when initialized with column width set to 3', () => {
    beforeEach(() => {
      component.width = 3;
    });

    it('classes is set to reflect width', () => {
      expect(component.classes).toContain('list__column-header flex-column flex-column--3');
    });
  });

  describe('when initialized with align set to right', () => {
    beforeEach(() => {
      component.align = 'right';
    });

    it('classes is set to reflect alignment', () => {
      expect(component.classes).toContain('column--align-right');
    });
  });

  describe('when initialized with align set to unknown alignment', () => {
    beforeEach(() => {
      component.align = 'bold';
    });

    it('classes is set to reflect default alignment', () => {
      expect(component.classes).toContain('column--align-left');
    });
  });

  describe('When initialized with sortdirection is ascending,', () => {
    beforeEach(() => {
      component.sortDirection = SortDirection.Ascending;
    });

    it('the isSortAscending is set to true', () => {
      expect(component.isSortAscending).toBeTruthy();
    });

    it('the isSortDescending is set to false', () => {
      expect(component.isSortDescending).toBeFalsy();
    });

  });
});

