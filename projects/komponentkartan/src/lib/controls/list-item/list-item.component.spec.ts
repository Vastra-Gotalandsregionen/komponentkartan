// file.only
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ListItemHeaderComponent } from './list-item-header.component';

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-list-item>
    <vgr-list-item-header>
      <vgr-list-column width="5">Förnamn</vgr-list-column>
      <vgr-list-column width="5">Efternamn</vgr-list-column>
      <vgr-list-column width="5">Yrke</vgr-list-column>
      <vgr-list-column width="5" align="right">inkomst</vgr-list-column>
    </vgr-list-item-header>
    <vgr-list-item-content>
      Dummy-content
    </vgr-list-item-content>
  </vgr-list-item>`
})
class TestListItemComponent { }


describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let rootElement: DebugElement;
  let listElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ListItemComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;
    fixture.detectChanges();
    listElement = rootElement.query(By.css('.list-item'));
  }));

  describe('When initialized as expanded', () => {
    beforeEach(() => {
      component.expanded = true;
      fixture.detectChanges();
    });

    it('the component is collapsed', () => {
      expect(listElement.classes['list-item--expanded']).toBe(true);
    });
  });

  describe('When initialized normally', () => {
    it('the component has the list-item class', () => {
      expect(listElement.classes['list-item']).toBe(true);
    });

    it('the component is collapsed', () => {
      expect(listElement.classes['list-item--expanded']).toBe(false);
    });
  });

  describe('and the list-item-header is clicked', () => {
    const event: any = { cancelBubble: false };
    let element: DebugElement;

    beforeEach(() => {
      spyOn(component, 'toggleExpand').and.callThrough();
      component.notInteractable = false;
      component.isDeleted = false;

      element = rootElement.query(By.css('.list-item__header_wrapper'));
      element.triggerEventHandler('click', event);

      fixture.detectChanges();
    });
    it('toggleExpand has been called once', () => {
      expect(component.toggleExpand).toHaveBeenCalledTimes(1);
    });
    it('component is expanded', () => {
      expect(listElement.classes['list-item--expanded']).toBe(true);
    });

    /*     it('click event is not bubbled', () => {
          expect(event.cancelBubble).toBeTruthy();
        }); */

    describe('and the header is clicked again', () => {
      const event2: any = { cancelBubble: false };

      beforeEach(() => {
        component.notInteractable = false;
        component.isDeleted = false;

        element = rootElement.query(By.css('.list-item__header_wrapper'));
        element.triggerEventHandler('click', event2);

        fixture.detectChanges();

      });

      it('component is not expanded', () => {
        expect(listElement.classes['list-item--expanded']).toBe(false);
      });
      it('toggleExpand has been called once again', () => {
        expect(component.toggleExpand).toHaveBeenCalledTimes(2);
      });
    });
  });

});
