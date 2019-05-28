import { DatepickerItemComponent } from './datepicker-item.component';

describe('[DatepickerItemComponent]', () => {
  let component: DatepickerItemComponent;

  beforeEach(() => {
    component = new DatepickerItemComponent();
  });

  describe('Instatiate', () => {
    it('date is correct', () => {
      expect(component.date).toBe(undefined);
    });
    it('type is correct', () => {
      expect(component.type).toBe(undefined);
    });
    it('selected is correct', () => {
      expect(component.selected).toBe(undefined);
    });
    it('disabled is correct', () => {
      expect(component.disabled).toBe(undefined);
    });
    it('isMinZoom is correct', () => {
      expect(component.isMinZoom).toBe(undefined);
    });
  });
});
