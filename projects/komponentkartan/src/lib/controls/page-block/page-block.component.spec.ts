import { PageBlockComponent } from './page-block.component';

describe('[PageBlockComponent]', () => {
  let component: PageBlockComponent;
  beforeEach(() => {
    component = new PageBlockComponent();
  });

  describe('Instatiate', () => {
    it('transparent is correct', () => {
      expect(component.transparent).toBe(false);
    });
  });

});