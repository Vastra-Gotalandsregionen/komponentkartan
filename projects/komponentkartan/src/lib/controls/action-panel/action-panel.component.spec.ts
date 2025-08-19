import { SimpleChanges, SimpleChange } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { ActionPanelComponent } from './action-panel.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CloseButtonComponent } from '../close-button/close-button.component';

describe('[ActionPanelComponent]', () => {
  let component: ActionPanelComponent;
  let fixture: ComponentFixture<ActionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionPanelComponent, CloseButtonComponent],
      imports: [BrowserAnimationsModule]
    })
      .compileComponents();
  });
  beforeEach(() => {
    component = new ActionPanelComponent(null);
    fixture = TestBed.createComponent(ActionPanelComponent);
  });

  beforeAll(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
  })
  afterAll(() => {
    jasmine.clock().uninstall();
  })
  describe('Instatiate', () => {
    it('title is correct', () => {
      expect(component.title).toBeFalsy();
    });
    it('open is correct', () => {
      expect(component.open).toBe(false);
    });
    it('showCloseButton is correct', () => {
      expect(component.showCloseButton).toBe(true);
    });
    it('slideState is correct', () => {
      expect(component.slideState).toBe('closed');
    });
    it('fadeState is correct', () => {
      expect(component.fadeState).toBe('visible');
    });
  });
  describe('ngOnInit', () => {
    describe('open is true', () => {
      beforeEach(() => {
        component.open = true;
        component.ngOnInit();
      });
      it('isOpened is correct', () => {
        expect(component.isOpened).toBe(true);
      });
      it('isClosed is correct', () => {
        expect(component.isClosed).toBe(false);
      });
    });
    describe('open is false', () => {
      beforeEach(() => {
        component.open = false;
        component.ngOnInit();
      });
      it('isOpened is correct', () => {
        expect(component.isOpened).toBe(false);
      });
      it('isClosed is correct', () => {
        expect(component.isClosed).toBe(true);
      });
    });
  });
  describe('ngOnChanges', () => {
    let changes: SimpleChanges;
    describe('open is changed', () => {
      describe('to true', () => {
        beforeEach(() => {
          changes = { 'open': { currentValue: true } as SimpleChange };
        });
        it('slideState is correct', () => {
          component.slideState = 'closed';
          component.ngOnChanges(changes);

          expect(component.slideState).toBe('open');
        });
        it('openChanged is emitted', () => {
          const spy = spyOn(component.openChanged, 'emit');
          component.ngOnChanges(changes);

          expect(spy).toHaveBeenCalledWith(true);
        });
      });
      describe('to false', () => {
        beforeEach(() => {
          changes = { 'open': { currentValue: false } as SimpleChange };
        });
        it('slideState is correct', () => {
          component.slideState = 'open';
          component.ngOnChanges(changes);

          expect(component.slideState).toBe('closed');
        });
        it('openChanged is emitted', () => {
          const spy = spyOn(component.openChanged, 'emit');
          component.ngOnChanges(changes);

          expect(spy).toHaveBeenCalledWith(false);
        });
      });
    });
    describe('showCloseButton is changed', () => {
      describe('to true', () => {
        it('fadeState is correct', () => {
          component.fadeState = 'hidden';
          changes = { 'showCloseButton': { currentValue: true } as SimpleChange };
          component.ngOnChanges(changes);

          expect(component.fadeState).toBe('visible');
        });
      });
      describe('to false', () => {
        it('fadeState is correct', () => {
          component.fadeState = 'visisble';
          changes = { 'showCloseButton': { currentValue: false } as SimpleChange };
          component.ngOnChanges(changes);

          expect(component.fadeState).toBe('hidden');
        });
      });
    });
  });
  describe('close', () => {
    it('open is correct', () => {
      component.open = true;
      component.close();

      expect(component.open).toBe(false);
    });
    it('slideState is correct', () => {
      component.slideState = 'open';
      component.close();

      expect(component.slideState).toBe('closed');
    });
    it('event is emitted', () => {
      const spy = spyOn(component.openChanged, 'emit');
      component.close();

      expect(spy).toHaveBeenCalledWith(false);
    });
  });
  describe('onSlideStart', () => {
    describe('from open', () => {
      it('isOpened is correct', () => {
        component.isOpened = true;
        const event = { fromState: 'open' } as AnimationEvent;
        component.onSlideStart(event);
        jasmine.clock().tick(10);
        fixture.detectChanges();

        expect(component.isOpened).toBe(false);
      });
    });
    describe('from closed', () => {
      it('isOpened is correct', () => {
        component.isOpened = true;
        const event = { fromState: 'closed' } as AnimationEvent;
        component.onSlideStart(event);

        expect(component.isOpened).toBe(true);
      });
    });
  });
  describe('onSlideEnd', () => {
    describe('from open', () => {
      it('isOpened is correct', () => {
        component.isOpened = false;
        const event = { fromState: 'open' } as AnimationEvent;
        component.onSlideEnd(event);

        expect(component.isOpened).toBe(false);
      });
    });
    describe('from closed', () => {
      it('isOpened is correct', () => {
        component.isOpened = false;
        const event = { fromState: 'closed' } as AnimationEvent;
        component.onSlideEnd(event);
        jasmine.clock().tick(10);
        fixture.detectChanges();

        expect(component.isOpened).toBe(true);
      });
    });
  });
});
