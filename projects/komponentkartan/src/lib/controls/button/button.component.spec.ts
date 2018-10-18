import { ButtonComponent } from './button.component';

describe('[ButtonComponent]', () => {
  let component: ButtonComponent;

  beforeEach(() => {
    component = new ButtonComponent();
  });

  describe('Instatiate', () => {
    it('disabled is correct', () => {
      expect(component.disabled).toBe(false);
    });

    it('type is correct', () => {
      expect(component.type).toBe('button');
    });

    it('buttonStyle is correct', () => {
      expect(component.buttonStyle).toBe('primary');
    });
  });
});
