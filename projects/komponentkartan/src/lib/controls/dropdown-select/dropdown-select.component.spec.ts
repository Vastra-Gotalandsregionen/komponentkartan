import { DropdownSelectComponent } from './dropdown-select.component';

describe('[DropdownSelectComponent]', () => {
  let component: DropdownSelectComponent;

  beforeEach(() => {
    component = new DropdownSelectComponent(null, null);
  });

  describe('Instatiate', () => {
    it('multi is correct', () => {
      expect(component.multi).toBe(false);
    });
    it('small is correct', () => {
      expect(component.small).toBe(false);
    });
    it('deselectable is correct', () => {
      expect(component.deselectable).toBe(false);
    });
    it('simpleLabel is correct', () => {
      expect(component.simpleLabel).toBe(false);
    });
    it('noItemSelectedLabel is correct', () => {
      expect(component.noItemSelectedLabel).toBe('Välj');
    });
    it('readonly is correct', () => {
      expect(component.readonly).toBe(false);
    });
    it('disabled is correct', () => {
      expect(component.disabled).toBe(false);
    });
    it('showValidation is correct', () => {
      expect(component.showValidation).toBe(true);
    });
    it('labelId is correct', () => {
      expect(component.labelId).toBe(undefined);
    });
    it('expanded is correct', () => {
      expect(component.expanded).toBe(false);
    });
    it('filterVisible is correct', () => {
      expect(component.filterVisible).toBe(false);
    });
    it('allSelected is correct', () => {
      expect(component.allSelected).toBe(false);
    });
    it('deselectDisabled is correct', () => {
      expect(component.deselectDisabled).toBe(true);
    });
    it('label is correct', () => {
      expect(component.label).toBe(component.noItemSelectedLabel);
    });
    describe('compareWith is correct', () => {
      it('for objects', () => {
        const object1 = {};
        const object2 = {};
        const sameResult = component.compareWith(object1, object1);
        const differentResult = component.compareWith(object1, object2);

        expect(sameResult).toBe(true);
        expect(differentResult).toBe(false);
      });
      it('for strings', () => {
        const sameResult = component.compareWith('a', 'a');
        const differentResult = component.compareWith('a', 'b');

        expect(sameResult).toBe(true);
        expect(differentResult).toBe(false);
      });
      it('for numbers', () => {
        const sameResult = component.compareWith(1, 1);
        const differentResult = component.compareWith(1, 2);

        expect(sameResult).toBe(true);
        expect(differentResult).toBe(false);
      });
      it('for booleans', () => {
        const sameResult = component.compareWith(true, true);
        const differentResult = component.compareWith(true, false);

        expect(sameResult).toBe(true);
        expect(differentResult).toBe(false);
      });
    });
  });

  describe('combinedLabelIds', () => {
    it('is labelId and headerLabelId', () => {
      component.labelId = 'someid';
      const expectedValue = `${component.labelId} ${component.headerLabelId}`;
      expect(component.combinedLabelIds).toBe(expectedValue);
    });
  });

  describe('onFocus', () => {
    it('hasFocus is set to true', () => {
      component.hasFocus = false;
      component.onFocus();
      expect(component.hasFocus).toBe(true);
    });
  });
});
