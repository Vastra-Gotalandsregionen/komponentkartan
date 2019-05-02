import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChanges, SimpleChange } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ActionPanelComponent } from './action-panel.component';
import { CloseButtonComponent } from '../close-button/close-button.component';
import { IconComponent } from '../icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('[ActionPanelComponent - Angular]', () => {
  let component: ActionPanelComponent;
  let fixture: ComponentFixture<ActionPanelComponent>;
  let componentEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FontAwesomeModule
      ],
      declarations: [
        ActionPanelComponent,
        CloseButtonComponent,
        IconComponent
      ]
    });

    fixture = TestBed.createComponent(ActionPanelComponent);
    component = fixture.componentInstance;
    componentEl = fixture.nativeElement;
  });

  describe('When creating component', () => {
    it('it is created', () => {
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    describe('and title is set', () => {
      it('title is displayed', () => {
        component.title = 'Some title';
        fixture.detectChanges();
        const titleEl = componentEl.querySelector('.action-panel__title');

        expect(titleEl.textContent).toBe('Some title');
      });
    });
  });

  describe('When clicking close button', () => {
    it('close method is called', () => {
      const spy = spyOn(component, 'close');
      const buttonEl = componentEl.querySelector('vgr-close-button') as HTMLElement;
      buttonEl.click();

      expect(spy).toHaveBeenCalled();
    });
  });
});
