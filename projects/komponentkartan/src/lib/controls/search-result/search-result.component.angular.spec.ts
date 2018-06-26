import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement, ElementRef, Component } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { SearchResultItem } from '../../models/searchResultItem.model';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import {
  SearchResultComponent
} from '../../index';


@Component({
  selector: 'vgr-test',
  template: `
          <div class="search-result-wrapper">
            <input (click)="show()" type="text" />
            <vgr-search-result  [(visible)]="dropdownVisible" (itemClick)="hide()"></vgr-search-result>
          </div>
          `
})
class TestSearchResultComponent {
  dropdownVisible = false;

  show() {
    this.dropdownVisible = true;
  }

  hide() {
    this.dropdownVisible = false;
  }

}

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let testSearchResultsComponentFixture: ComponentFixture<TestSearchResultComponent>;
  let rootElement: DebugElement;
  const dummyData: SearchResultItem[] = getDemoItems(50);

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [
        TestSearchResultComponent,
        SearchResultComponent
      ],
      imports: [PerfectScrollbarModule, BrowserDynamicTestingModule],
      providers: [
        { provide: ElementRef }
      ]
    });

    TestBed.compileComponents()
      .then(() => {
        testSearchResultsComponentFixture = TestBed.createComponent(TestSearchResultComponent);
        component = testSearchResultsComponentFixture.debugElement.query(By.directive(SearchResultComponent)).componentInstance;
        rootElement = testSearchResultsComponentFixture.debugElement;

        testSearchResultsComponentFixture.detectChanges();
        done();
      });
  });


  describe('When component is initialized with values ', () => {
    beforeEach(() => {
      component.maxItems = 15;
      component.visible = true;
      component.noResultsText = 'Det fanns inte träffar hos KIV.';
      component.items = dummyData;
      component.description = 'Här är en description till sökresultatet';
      component.ngOnInit();
      // component.ngOnChanges();
      // searchResultsComponentFixture.detectChanges();
      testSearchResultsComponentFixture.detectChanges();
    });

    it('searchresult has class search-results--open', () => {
      const vgrSearchResult = rootElement.query(By.css('vgr-search-result'));
      expect(vgrSearchResult.classes['search-results--open']).toBe(true);
    });

    it('should not have more elements then maxItem', () => {
      const list = rootElement.query(By.css('ul.search-results__items'));
      expect(list.nativeElement.children.length).toBeLessThanOrEqual(component.maxItems);
    });

    it('should not show a no items message', () => {
<<<<<<< HEAD
        const noMatchesMessage = rootElement.query(By.css('div.search-results__noresults'));
        expect(noMatchesMessage).toBeFalsy(false);
=======
      const noMatchesMessage = rootElement.query(By.css('div.search-results__noresults'));
      console.log(noMatchesMessage);
      expect(noMatchesMessage).toBeFalsy(false);
>>>>>>> search-results
    });

    it('should show the description when it\'s provided', () => {
      const description = rootElement.query(By.css('.search-results__description-field'));
      expect(description.nativeElement.innerHTML.trim()).toBe(component.description);
    });
  });

  describe(' testing key event', () => {
    beforeEach(() => {
      component.visible = true;
      component.items = dummyData;
      component.ngOnInit();
      component.ngOnChanges();
      testSearchResultsComponentFixture.detectChanges();
      /*const input = rootElement.query(By.css('input'));
      input.nativeElement.click();
      testSearchResultsComponentFixture.detectChanges();
      console.log(component.visible);*/
      spyOn(component, 'handleKeyevents').and.callThrough();
    });

/*     it('should should focus the first item when you press arrow down in the input field', () => {
      // const input = rootElement.query(By.css('input'));
      rootElement.triggerEventHandler('keydown', { keyCode: 40 } as KeyboardEvent);
      testSearchResultsComponentFixture.detectChanges();
      console.log(component.focusItem);
      expect(component.handleKeyevents).toHaveBeenCalled();
      // console.log(rootElement.query(By.css('vgr-search-result')).nativeElement.classList );
    }); */

    fit('should close the search result when you press escape', () => {
      const keyEvent = new KeyboardEvent('keydown', {key: 'Escape'});
      Object.defineProperty(keyEvent, 'keyCode', {'value' : 27});
      component.handleKeyevents(keyEvent);
      testSearchResultsComponentFixture.detectChanges();
      expect(component.visible).toBe(false);
    });

    fit('should close the search result when you press escape', () => {
      const keyEvent = new KeyboardEvent('keydown', {key: 'Tab'});
      Object.defineProperty(keyEvent, 'keyCode', {'value' : 9});
      component.handleKeyevents(keyEvent);
      testSearchResultsComponentFixture.detectChanges();
      expect(component.visible).toBe(false);
    });

    fit('should focus on the first item in the list when you press arrow down', () => {
      const keyEvent = new KeyboardEvent('keydown', {key: 'ArrowDown'});
      Object.defineProperty(keyEvent, 'keyCode', {'value' : 40});
      component.handleKeyevents(keyEvent);
      testSearchResultsComponentFixture.detectChanges();
      expect(component.focusItem).toBe(0);
    });

    fit('should focus on the last item in the list when you press arrow up', () => {
      const keyEvent = new KeyboardEvent('keydown', {key: 'ArrowUp'});
      Object.defineProperty(keyEvent, 'keyCode', {'value' : 38});
      component.handleKeyevents(keyEvent);
      testSearchResultsComponentFixture.detectChanges();
      console.log(component.focusItem);
      expect(component.focusItem).toBe(24);
    });


  });

  describe('When component is provided with an empty list ', () => {
    beforeEach(() => {
      component.visible = true;
      // component.description = 'Här är en description till sökresultatet';
      component.ngOnChanges();
      testSearchResultsComponentFixture.detectChanges();
    });

    it('should show a message when no items in result', () => {
      const message = rootElement.query(By.css('.search-results__noresults'));
      expect(message.nativeElement.innerHTML.trim()).toBe(component.noResultsText);
    });

    it('should not show the description when it\'s not provided', () => {
      const description = rootElement.query(By.css('.search-results__description-field'));
      expect(description).toBeFalsy();
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
