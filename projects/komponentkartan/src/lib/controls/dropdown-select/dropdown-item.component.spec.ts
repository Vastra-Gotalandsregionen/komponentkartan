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
    it('multi is correct', () => {
      expect(component.multi).toBe(false);
    });
    it('selected is correct', () => {
      expect(component.selected).toBe(false);
    });
    it('visible is correct', () => {
      expect(component.visible).toBe(true);
    });
  });

  describe('toggleSelect', () => {
    describe('When multi is true', () => {
      beforeEach(() => {
        component.multi = true;
      });
      it('toggle is emitted', () => {
        const spy = spyOn(component.toggle, 'emit');
        component.toggleSelect();
        expect(spy).toHaveBeenCalled();
      });
      describe('and selected is true', () => {
        beforeEach(() => {
          component.selected = true;
        });
        it('selected is set to false', () => {
          component.toggleSelect();
          expect(component.selected).toBe(false);
        });
      });
      describe('and selected is false', () => {
        beforeEach(() => {
          component.selected = false;
        });
        it('selected is set to true', () => {
          component.toggleSelect();
          expect(component.selected).toBe(true);
        });
      });
    });
    describe('When multi is false', () => {
      beforeEach(() => {
        component.multi = false;
      });
      it('selected is set to true', () => {
        component.toggleSelect();
        expect(component.selected).toBe(true);
      });
      it('confirm is emitted', () => {
        const spy = spyOn(component.confirm, 'emit');
        component.toggleSelect();
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('onFocus', () => {
    it('hasFocus is set to true', () => {
      component.hasFocus = pickRandom([true, false]);
      component.onFocus();
      expect(component.hasFocus).toBe(true);
    });
  });

  describe('onBlur', () => {
    it('hasFocus is set to false', () => {
      component.hasFocus = pickRandom([true, false]);
      component.onBlur();
      expect(component.hasFocus).toBe(false);
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
    describe('When key is ArrowDown or Down', () => {
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
    describe('When key is <space> or Spacebar', () => {
      beforeEach(() => {
        const key = pickRandom([' ', 'Spacebar']);
        event = { key: key } as KeyboardEvent;
      });
      describe('and multi is true', () => {
        beforeEach(() => {
          component.multi = true;
        });
        it('toggle is emitted', () => {
          const spy = spyOn(component.toggle, 'emit');
          component.toggleSelect();
          expect(spy).toHaveBeenCalled();
        });
        describe('and selected is true', () => {
          beforeEach(() => {
            component.selected = true;
          });
          it('selected is set to false', () => {
            component.toggleSelect();
            expect(component.selected).toBe(false);
          });
        });
        describe('and selected is false', () => {
          beforeEach(() => {
            component.selected = false;
          });
          it('selected is set to true', () => {
            component.toggleSelect();
            expect(component.selected).toBe(true);
          });
        });
      });
    });
    describe('When key is Enter', () => {
      beforeEach(() => {
        event = { key: 'Enter' } as KeyboardEvent;
        component.selected = pickRandom([true, false]);
      });
      it('confirm is emitted', () => {
        const spy = spyOn(component.confirm, 'emit');
        component.onKeydown(event);
        expect(spy).toHaveBeenCalled();
      });
      it('selected is set to true', () => {
        component.toggleSelect();
        expect(component.selected).toBe(true);
      });
    });
    describe('When key is word character', () => {
      let key: string;
      beforeEach(() => {
        key = pickRandom([
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
          'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
          'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö', '1',
          '2', '3', '4', '5', '6', '7', '8', '9', '0', '_'
        ]);
        event = { key: key } as KeyboardEvent;
        component.selected = pickRandom([true, false]);
      });
      it('nextMatch is emitted', () => {
        const spy = spyOn(component.nextMatch, 'emit');
        component.onKeydown(event);
        expect(spy).toHaveBeenCalledWith(key);
      });
    });
  });
});
