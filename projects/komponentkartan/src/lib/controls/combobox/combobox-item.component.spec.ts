import { ComboboxItemComponent } from './combobox-item.component';

describe('[ComboboxItemComponent]', () => {
  let component: ComboboxItemComponent;

  beforeEach(() => {
    component = new ComboboxItemComponent();
  });

  describe('Instatiate', () => {
    it('selectedLabel is correct', () => {
      expect(component.selectedLabel).toBe(undefined);
    });
    it('value is correct', () => {
      expect(component.value).toBe(undefined);
    });
    it('label is correct', () => {
      expect(component.label).toBe(undefined);
    });
    it('index is correct', () => {
      expect(component.index).toBe(undefined);
    });
    it('highlighted is correct', () => {
      expect(component.highlighted).toBe(false);
    });
    it('selected is correct', () => {
      expect(component.selected).toBe(false);
    });
    it('visible is correct', () => {
      expect(component.visible).toBe(true);
    });
  });

  describe('select', () => {
      it('selected is set to true', () => {
        component.setSelected();
        expect(component.selected).toBe(true);
      });
      it('confirm is emitted', () => {
        const spy = spyOn(component.select, 'emit');
        component.setSelected();
        expect(spy).toHaveBeenCalled();
      });
  });
});
