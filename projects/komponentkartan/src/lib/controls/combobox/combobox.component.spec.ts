import { ComboboxComponent } from './combobox.component';

describe('[ComboboxComponent]', () => {
  let component: ComboboxComponent;

  beforeEach(() => {
    component = new ComboboxComponent(null, null);
  });

  describe('Instatiate', () => {
    it('small is correct', () => {
      expect(component.small).toBe(false);
    });
    it('readonly is correct', () => {
      expect(component.readonly).toBe(false);
    });
    it('disabled is correct', () => {
      expect(component.disabled).toBe(false);
    });
    it('showButton is correct', () => {
      expect(component.showButton).toBe(true);
    });
    it('listAlignRight is correct', () => {
      expect(component.listAlignRight).toBe(false);
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
});
