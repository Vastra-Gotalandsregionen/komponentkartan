import { DatepickerNewComponent } from './datepicker-new.component';

describe('[DatepickerNewComponent]', () => {
  let component: DatepickerNewComponent;

  beforeEach(() => {
    component = new DatepickerNewComponent(null, null);
  });

  describe('Instatiate', () => {
    it('selectedDate is correct', () => {
      expect(component.selectedDate).toBe(undefined);
    });
    it('minZoom is correct', () => {
      expect(component.minZoom).toBe(undefined);
    });
    it('minDate is correct', () => {
      expect(component.minDate).toBe(undefined);
    });
    it('maxDate is correct', () => {
      expect(component.maxDate).toBe(undefined);
    });
    it('allowText is correct', () => {
      expect(component.allowText).toBe(true);
    });
    it('disabled is correct', () => {
      expect(component.disabled).toBe(false);
    });
    it('readonly is correct', () => {
      expect(component.readonly).toBe(false);
    });
    it('showValidation is correct', () => {
      expect(component.showValidation).toBe(true);
    });
    it('errorMessage is correct', () => {
      expect(component.errorMessage).toEqual({});
    });
    it('labelId is correct', () => {
      expect(component.labelId).toBe(undefined);
    });
  });
});
