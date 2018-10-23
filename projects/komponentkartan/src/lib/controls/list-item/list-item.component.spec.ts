// file.only
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ListItemContentComponent, ListItemHeaderComponent } from './list-item-content.component';


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
  let component: TestListItemComponent;
  let fixture: ComponentFixture<TestListItemComponent>;
  let rootElement: DebugElement;
  let listElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        TestListItemComponent,
        ListItemComponent,
        ListItemContentComponent,
        ListItemHeaderComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestListItemComponent);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;
    fixture.detectChanges();
    listElement = rootElement.query(By.css('.list-item'));
  }));

  describe('When initialized', () => {
    it('the component has the list-item class', () => {
      console.log(rootElement, component);
      expect(listElement.classes['list-item']).toBe(true);
    });

    it('the component is collapsed', () => {
      console.log(listElement.classes);
      expect(listElement.classes['list-item--expanded']).toBe(false);
    });

    it(' the indent on content is set to true', () => {
      expect(listElement.componentInstance.listContent.indentContent).toBe(true);
    });
  });
});
