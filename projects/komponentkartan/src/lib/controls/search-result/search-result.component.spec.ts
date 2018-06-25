import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement, ElementRef } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { SearchResultItem } from '../../models/searchResultItem.model';
import { SearchResultComponent } from './search-result.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let rootElement: DebugElement;
  const dummyData: SearchResultItem[] = getDemoItems(50);

  beforeEach(async(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent],
      imports: [PerfectScrollbarModule],
      providers: [
        { provide: ElementRef }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const element = document.createElement('DIV');
    element.className = 'search-result-wrapper';
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getParentNode').and.returnValue(element);
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });


  describe('When component is initialized without values ', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('searchresult is not expanded', () => {
      expect(component.visible).toBe(false);
    });

    it('noResultsText is the default value', () => {
      expect(component.noResultsText).toBe('Inget resultat');
    });

    it('maxItems has the default value (25)', () => {
      expect(component.maxItems).toBe(25);
    });

  });

  describe('When component is initialized with values ', () => {
    beforeEach(() => {
      component.maxItems = 15;
      component.visible = true;
      component.noResultsText = 'Det fanns inte träffar hos KIV.';
      component.items = dummyData;
      component.ngOnInit();
    });

    it('expanded is true ', () => {
      expect(component.visible).toBe(true);
    });

    it('noResultsText is not the default', () => {
      expect(component.noResultsText).toBe('Det fanns inte träffar hos KIV.');
    });

    it('maxItems has the value 15', () => {
      expect(component.maxItems).toBe(15);
    });

    it('items is set', () => {
      expect(component.items).toBe(dummyData);
    });

  });

});


function getDemoItems(numberOfItems: number, addSecondRow: boolean = false) {
  const items: SearchResultItem[] = [];
  for (let i = 1; i <= numberOfItems; i++) {
    const name = Math.random() > 0.7 ? `${i} - Min mottagning har ett jättelångt namn` : `${i} - Min mottagning`;
    const displayName = new Array(name);
    const item: any = {};
    if (addSecondRow) {
      displayName.push('Placering');
      item.secondRowItalic = true;
    }
    item.value = name;
    item.displayName = displayName;
    items.push(item as SearchResultItem);
  }
  return items;
}