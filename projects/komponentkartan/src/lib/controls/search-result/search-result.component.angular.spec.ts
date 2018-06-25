import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement, ElementRef } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { SearchResultItem } from 'vgr-komponentkartan';
import { SearchResultComponent } from './search-result.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let rootElement: DebugElement;
  const dummyData : SearchResultItem[] = getDemoItems(50);

  beforeEach(async(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ SearchResultComponent ],
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
    spyOn(component, 'getParentNode' ).and.returnValue(element);
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('When component is initialized with values ', () => {
    beforeEach(() => {
      component.maxItems = 15;
      component.visible = true;
      component.noResultsText = 'Det fanns inte träffar hos KIV.';
      component.items = dummyData;
      component.description = 'Här är en description till sökresultatet';
      component.ngOnInit();
      component.ngOnChanges();
      fixture.detectChanges();
    });

    it('searchresult has class search-results--open', () => {
        expect(rootElement.classes['search-results--open']).toBe(true);
    });

    it('should not have more elements then maxItem', () => {
        const list = rootElement.query(By.css('ul.search-results__items'));
        expect(list.nativeElement.children.length).toBeLessThanOrEqual(component.maxItems);
    });

    it('should not show a no items message', () => {
        const noMatchesMessage = rootElement.query(By.css('div.search-results__noresults'));
        console.log(noMatchesMessage);
        expect(noMatchesMessage).toBeFalsy(false);
    });

    it('should show the description when it\'s provided', () => {
      const description = rootElement.query(By.css('.search-results__description-field'));
      console.log(description.nativeElement.innerHTML);
      expect(description.nativeElement.innerHTML.trim()).toBe(component.description);
    });
  });

  describe('When component is provided with an empty list ', () => {
    beforeEach(() => {
      component.visible = true;
      // component.description = 'Här är en description till sökresultatet';
      component.ngOnChanges();
      fixture.detectChanges();
    });

    it('should show a message when no items in result', () => {
      const message = rootElement.query(By.css('.search-results__noresults'));
      expect(message.nativeElement.innerHTML.trim()).toBe(component.noResultsText);
    });

    it('should not show the description when it\'s not provided', () => {
      const description = rootElement.query(By.css('.search-results__description-field'));
      console.log(description);
      expect(description).toBeFalsy();
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
    items.push( item as SearchResultItem);
  }
  return items;
}