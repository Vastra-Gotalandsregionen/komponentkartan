import { IconComponent } from './icon.component';

describe('[IconComponent]', () => {
  let component: IconComponent;

  beforeEach(() => {
    component = new IconComponent();
  });

  describe('Instatiate', () => {
    it('color is correct', () => {
      expect(component.color).toBe('primary');
    });
    it('size is correct', () => {
      expect(component.size).toBe('');
    });
    it('ariaLabel is correct', () => {
      expect(component.ariaLabel).toBe('');
    });
    it('solid is correct', () => {
      expect(component.solid).toBe(true);
    });
    it('fixedWidth is correct', () => {
      expect(component.fixedWidth).toBe(false);
    });
    it('spin is correct', () => {
      expect(component.spin).toBe(false);
    });
    it('pulse is correct', () => {
      expect(component.pulse).toBe(false);
    });
    it('border is correct', () => {
      expect(component.border).toBe(false);
    });
    it('disabled is correct', () => {
      expect(component.disabled).toBe(false);
    });
  });
});