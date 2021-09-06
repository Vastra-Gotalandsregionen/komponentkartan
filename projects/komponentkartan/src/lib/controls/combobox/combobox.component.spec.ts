import { ComboboxComponent } from './combobox.component';

function pickRandom(values: any[]): any {
  const index = Math.ceil(Math.random() * values.length) - 1;
  return values[index];
}

describe('[ComboboxComponent]', () => {
  let component: ComboboxComponent;

  beforeEach(() => {
    component = new ComboboxComponent(null);
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

  describe('onFocus', () => {
    it('hasFocus is set to true', () => {
      component.hasFocus = false;
      component.onFocus();
      expect(component.hasFocus).toBe(true);
    });
  });

  // describe('onKeydown', () => {
  //   let event;
  //   describe('When key is ArrowUp or Up', () => {
  //     beforeEach(() => {
  //       const key = pickRandom(['ArrowUp', 'Up']);
  //       event = { key: key } as KeyboardEvent;
  //     });
  //     it('previous is emitted', () => {
  //       const spy = spyOn(component.expandedChanged, 'emit');
  //       component.onKeydown(event);
  //       expect(spy).toHaveBeenCalled();
  //     });
  //   });
  //   describe('When key is ArrowDown or Down', () => {
  //     beforeEach(() => {
  //       const key = pickRandom(['ArrowDown', 'Down']);
  //       event = { key: key } as KeyboardEvent;
  //     });
  //     it('next is emitted', () => {
  //       const spy = spyOn(component.expandedChanged, 'emit');
  //       component.onKeydown(event);
  //       expect(spy).toHaveBeenCalled();
  //     });
  //   });
  //   describe('When key is Enter', () => {
  //     describe('searchString is empty', () => {
  //       beforeEach(() => {
  //         component.searchString = '';
  //       });
  //       beforeEach(() => {
  //         event = { key: 'Enter' } as KeyboardEvent;
  //       });
  //       it('expandedChanged is emitted', () => {
  //         const spy = spyOn(component.expandedChanged, 'emit');
  //         component.onKeydown(event);
  //         expect(spy).toHaveBeenCalled();
  //       });
  //     })
  //     describe('searchString is not empty', () => {
  //       beforeEach(() => {
  //         component.searchString = 'abc';
  //       });
  //       beforeEach(() => {
  //         event = { key: 'Enter' } as KeyboardEvent;
  //       });
  //       it('expanded is falsy', () => {
  //         component.onKeydown(event);
  //         expect(component.expanded).toBeFalse()
  //       });
  //     })
  //   });
  //   describe('When key is word character', () => {
  //     let key: string;
  //     beforeEach(() => {
  //       key = pickRandom([
  //         'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  //         'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  //         'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö', '1',
  //         '2', '3', '4', '5', '6', '7', '8', '9', '0', '_'
  //       ]);
  //       event = { key: key } as KeyboardEvent;
  //     });
  //     it('nextMatch is emitted', () => {
  //       const spy = spyOn(component.expandedChanged, 'emit');
  //       component.onKeydown(event);
  //       expect(spy).toHaveBeenCalled();
  //     });
  //   });
  // });
});
