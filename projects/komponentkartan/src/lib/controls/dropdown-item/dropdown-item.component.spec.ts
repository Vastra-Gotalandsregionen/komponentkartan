import { DropdownItemComponent } from './dropdown-item.component';

function pickRandom(values: any[]): any {
  const index = Math.ceil(Math.random() * values.length) - 1;
  return values[index];
}

describe('[DropdownItemComponent]', () => {
  let component: DropdownItemComponent;

  beforeEach(() => {
    component = new DropdownItemComponent();
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
    it('selected is correct', () => {
      expect(component.selected).toBe(false);
    });
    it('visible is correct', () => {
      expect(component.visible).toBe(true);
    });
  });

  describe('toggleSelect', () => {
    describe('When selected is false', () => {
      beforeEach(() => {
        component.selected = false;
      });
      it('selected is set to true', () => {
        component.toggleSelect();
        expect(component.selected).toBe(true);
      });
      it('selectedChanged is emitted with true', () => {
        const spy = spyOn(component.selectedChanged, 'emit');
        component.toggleSelect();
        expect(spy).toHaveBeenCalledWith(true);
      });
    });
    describe('When selected is true', () => {
      beforeEach(() => {
        component.selected = true;
      });
      it('selected is set to false', () => {
        component.toggleSelect();
        expect(component.selected).toBe(false);
      });
      it('selectedChanged is emitted with false', () => {
        const spy = spyOn(component.selectedChanged, 'emit');
        component.toggleSelect();
        expect(spy).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('onKeydown', () => {
    let event;
    describe('When key is ArrowUp or Up', () => {
      beforeEach(() => {
        const key = pickRandom(['ArrowUp', 'Up']);
        event = { key: key } as KeyboardEvent;
      });
      it('previous is emitted', () => {
        const spy = spyOn(component.previous, 'emit');
        component.onKeydown(event);
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('When key is ArrowDown', () => {
      beforeEach(() => {
        const key = pickRandom(['ArrowDown', 'Down']);
        event = { key: key } as KeyboardEvent;
      });
      it('next is emitted', () => {
        const spy = spyOn(component.next, 'emit');
        component.onKeydown(event);
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('When key is <space>, Spacebar or Enter', () => {
      beforeEach(() => {
        const key = pickRandom([' ', 'Spacebar', 'Enter']);
        event = { key: key } as KeyboardEvent;
      });
      describe('and selected is false', () => {
        beforeEach(() => {
          component.selected = false;
        });
        it('selected is set to true', () => {
          component.onKeydown(event);
          expect(component.selected).toBe(true);
        });
        it('selectedChanged is emitted with true', () => {
          const spy = spyOn(component.selectedChanged, 'emit');
          component.onKeydown(event);
          expect(spy).toHaveBeenCalledWith(true);
        });
      });
      describe('and selected is true', () => {
        beforeEach(() => {
          component.selected = true;
        });
        it('selected is set to false', () => {
          component.onKeydown(event);
          expect(component.selected).toBe(false);
        });
        it('selectedChanged is emitted with false', () => {
          const spy = spyOn(component.selectedChanged, 'emit');
          component.onKeydown(event);
          expect(spy).toHaveBeenCalledWith(false);
        });
      });
    });
  });
});
