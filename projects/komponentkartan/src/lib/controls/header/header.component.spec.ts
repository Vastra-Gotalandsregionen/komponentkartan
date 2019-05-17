import { HeaderComponent } from './header.component';

describe('[HeaderComponent]', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    component = new HeaderComponent();
  });

  describe('Instatiate', () => {
    it('headerMenu is correct', () => {
      expect(component.headerMenuComponent).toBeFalsy();
    });
    it('systemText is correct', () => {
      expect(component.systemText).toBeFalsy();
    });
    it('hideSwosh is correct', () => {
      expect(component.hideSwosh).toBeFalsy();
    });
    it('logoClass is correct', () => {
      expect(component.logoClass).toBeFalsy();
    });
  });
});
