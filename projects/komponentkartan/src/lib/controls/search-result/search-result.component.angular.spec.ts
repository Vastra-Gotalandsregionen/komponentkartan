import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement, Component } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { SearchResultItem } from '../../models/searchResultItem.model';

import {
  SearchResultComponent
} from '../../index';
import { ScrollbarComponent } from '../scrollbar/scrollbar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';


@Component({
    selector: 'vgr-test',
    template: `
          <div class="search-result-wrapper">
            <input (click)="show()" type="text" />
            <vgr-search-result  [(visible)]="dropdownVisible" (itemClick)="hide()"></vgr-search-result>
          </div>
          `,
    standalone: false
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

describe('[SearchResultComponent - Angular]', () => {
  let component: SearchResultComponent;
  let testSearchResultsComponentFixture: ComponentFixture<TestSearchResultComponent>;
  let onlyComponentFixture: ComponentFixture<SearchResultComponent>;
  let rootElement: DebugElement;
  const dummyData: SearchResultItem[] = getDemoItems(50);

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
});
    TestBed.configureTestingModule({
      declarations: [
        TestSearchResultComponent,
        SearchResultComponent,
        ScrollbarComponent
      ],
      imports: [BrowserDynamicTestingModule, NgScrollbarModule]
    });

    TestBed.compileComponents()
    .then(() => {
      onlyComponentFixture = TestBed.createComponent(SearchResultComponent);
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
        const noMatchesMessage = rootElement.query(By.css('div.search-results__noresults'));
        expect(noMatchesMessage).toBeFalsy(false);
    });

    it('should show the description when it\'s provided', () => {
      const description = rootElement.query(By.css('.search-results__description-field'));
      expect(description.nativeElement.innerHTML.trim()).toBe(component.description);
    });

    describe(' and you click outside ', () => {
      beforeEach(() => {
        document.body.click();
      });

      it('should close the list', () => {
        expect(component.visible).toBe(false);
      });

    });


  });

  describe(' testing key event', () => {
    beforeEach(() => {
      component.visible = true;
      component.items = dummyData;
      component.ngOnInit();
      component.ngOnChanges();
      testSearchResultsComponentFixture.detectChanges();
    });

    describe(' when you press escape ', () => {
      beforeEach(() => {
        component.handleKeyevents(new KeyboardEvent('keydown', {key: 'Escape'}));
        testSearchResultsComponentFixture.detectChanges();
      });

      it('should close the list', () => {
        expect(component.visible).toBe(false);
      });

    });

    describe(' when you press arrow down ', () => {
      beforeEach(() => {
        component.handleKeyevents(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
        spyOn(component, 'onItemClick').and.callThrough();
        testSearchResultsComponentFixture.detectChanges();
      });

      it(' should focus on the first item in the list', () => {
        expect(component.focusItem).toBe(0);
      });

      describe(' and you press space ', () => {
        beforeEach(() => {
          const keyEvent = new KeyboardEvent('keydown', {key: 'Spacebar'});
          const focusedElement = rootElement.query(By.css('.search-results-item--focused'));
          Object.defineProperty(keyEvent, 'target', {'value' : focusedElement.nativeElement});
          component.handleKeyevents(keyEvent);
          testSearchResultsComponentFixture.detectChanges();
        });

        it(' it should trigger the itemClick event', () => {
          expect(component.onItemClick).toHaveBeenCalled();
        });

        it(' and be closed', () => {
          expect(component.visible).toBe(false);
        });

      });

      describe(' and you press enter ', () => {
        beforeEach(() => {
          const keyEvent = new KeyboardEvent('keydown', {key: 'Enter'});
          const focusedElement = rootElement.query(By.css('.search-results-item--focused'));
          Object.defineProperty(keyEvent, 'target', {'value' : focusedElement.nativeElement});
          component.handleKeyevents(keyEvent);
          testSearchResultsComponentFixture.detectChanges();
        });

        it(' it should trigger the itemClick event', () => {
          expect(component.onItemClick).toHaveBeenCalled();
        });

        it(' and be closed', () => {
          expect(component.visible).toBe(false);
        });

        describe(' when you press arrow up ', () => {
          beforeEach(() => {
            const keyEvent = new KeyboardEvent('keydown', {key: 'ArrowUp'});
            component.handleKeyevents(keyEvent);
            testSearchResultsComponentFixture.detectChanges();
            spyOn(component, 'setFocusedElement');
          });
          it(' focusitem should ramin the same', () => {
            expect(component.setFocusedElement).toHaveBeenCalledTimes(0);
          });
        });
      });


    });

    describe(' when you press arrow up ', () => {
      beforeEach(() => {
        const keyEvent = new KeyboardEvent('keydown', {key: 'ArrowUp'});
        component.handleKeyevents(keyEvent);
        testSearchResultsComponentFixture.detectChanges();

      });

      it(' should focus on the last item in the list', () => {
        expect(component.focusItem).toBe(24);
      });

      describe(' and then press arrow down ', () => {
        beforeEach(() => {
          const keyEvent = new KeyboardEvent('keydown', {key: 'ArrowDown'});
          component.handleKeyevents(keyEvent);
          testSearchResultsComponentFixture.detectChanges();

        });
        it(' should focus on the first item in the list', () => {
          expect(component.focusItem).toBe(0);
        });
      });

    });

  });

  describe(' when you have a list with items but no description ', () => {
    beforeEach(() => {
      component.items = dummyData;
      component.maxItems = 200;
      jasmine.clock().uninstall();
      jasmine.clock().install();
      component.ngOnChanges();
      testSearchResultsComponentFixture.detectChanges();
    });
    it(' should focus on the last item in the list', () => {
      jasmine.clock().tick(30);
      expect(component.descriptionHeight).toBe(0);
    });
  });

  describe('When component is provided with an empty list ', () => {
    beforeEach(() => {
      component.visible = true;
      // component.description = 'Här är en description till sökresultatet';
      component.ngOnInit();
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

    describe(' when you press arrow down ', () => {
      beforeEach(() => {
        component.handleKeyevents(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
        testSearchResultsComponentFixture.detectChanges();
        spyOn(component, 'onItemClick').and.callThrough();
      });

      it(' it should not change the focusitem since there is no item to focus on', () => {
        expect(component.focusItem).toBe(-1);
      });

    });


  });

  describe('When component is places outside of wrapper', () => {
    it(' it should throw an error', () => {
      const onlyComponent = onlyComponentFixture.componentInstance;
      expect(() => onlyComponent.ngOnInit()).toThrow(new Error('Du har glömt att lägga din search-result komponent i en wrapper'));
    });
  });

});



function getDemoItems(numberOfItems: number, addSecondRow: boolean = true) {
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
