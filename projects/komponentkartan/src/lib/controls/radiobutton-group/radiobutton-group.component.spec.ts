import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from '../icon/icon.component';
import { IconModule } from '../icon/icon.module';


import { RadiobuttonGroupComponent } from './radiobutton-group.component';
import { RadiobuttonItemComponent } from './radiobutton-item.component';


@Component({
  selector: 'vgr-radiogroup-test',
  template: `
  <vgr-radiobutton-group>
      <vgr-radiobutton-item>One</vgr-radiobutton-item>
      <vgr-radiobutton-item>Two</vgr-radiobutton-item>
      <vgr-radiobutton-item>Three</vgr-radiobutton-item>
  </vgr-radiobutton-group>
  `
}) class TestRadiogroupComponent { }

describe('RadiobuttonGroupComponent', () => {
  let component: RadiobuttonGroupComponent;
  // let fixture: ComponentFixture<RadiobuttonGroupComponent>;
  let fixture: ComponentFixture<TestRadiogroupComponent>;
  let rootElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestRadiogroupComponent, RadiobuttonGroupComponent, RadiobuttonItemComponent, IconComponent],
      imports: [IconModule, FontAwesomeModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRadiogroupComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(RadiobuttonGroupComponent)).componentInstance;
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });

  beforeAll(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
  })
  afterAll(() => {
    jasmine.clock().uninstall();
    discardPeriodicTasks();
    flush();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Instantiate', () => {
    it('vertical is false', () => {
      expect(component.vertical).toBe(false);
    });
    it('showValidation is true', () => {
      expect(component.showValidation).toBe(true);
    });
    it('required is false', () => {
      expect(component.required).toBe(false);
    });
    it('validationErrorMessage is "Obligatoriskt"', () => {
      expect(component.validationErrorMessage).toBe('Obligatoriskt');
    });
  });

  describe('No items selected', () => {
    beforeEach(() => {
      component.items.forEach(element => element.selected = false);
      fixture.detectChanges();
      component.ngAfterContentInit();
      fixture.detectChanges();
      jasmine.clock().tick(10);
      fixture.detectChanges();

    });



    // it('firstOptionFocusable has been called', () => {
    //   expect(spyFirstOptionFocusable).toHaveBeenCalled();
    // });

    it('firstItem has tabIndex = 0', () => {
      const firstItem = rootElement.queryAll(By.css('vgr-radiobutton-item .radio-button__icon'))[0];
      expect(firstItem.nativeElement.tabIndex).toBe(0);
      });

      it('other Items has tabIndex = -1', () => {
        const noTabIndexItems = rootElement.queryAll(By.css('vgr-radiobutton-item .radio-button__icon')).filter(x => x.nativeElement.tabIndex === -1);
        expect(noTabIndexItems.length).toBe(2);
      });
  });

  describe('Item preselected', () => {
    beforeEach(() => {
      // component.items.filter(x => x.value === 'One')[0].selected = true;

      component.value = 'One';


      fixture.detectChanges();
      component.ngAfterContentInit();
      fixture.detectChanges();

      jasmine.clock().tick(100);

      fixture.detectChanges();

    });

    it('one item is selected', () => {
      expect(component.items.filter(x => x.selected).length).toBe(1);
    })
    it('preselected item to be selected', () => {
      expect(component.items.filter(x => x.selected)[0].value).toBe('One');
    })
    it('selected item has checked class set', () =>{
      const selectedOption = rootElement.query(By.css('.radio-button--checked'));
      expect(selectedOption.nativeElement.innerText).toBe('One')
    })
  });

  describe('Horizontal and vertical', () => {
    describe('Horizontal (default)', () => {
      let alignment;
      beforeEach(() => {
        alignment = rootElement.queryAll(By.css('.radiobutton-group-validation > div'))[0];
        fixture.detectChanges();
      });
      it('class "vertical" should be undefined', () => {
        expect(alignment.classes['vertical']).toBeUndefined();
      });

      it('vertical should be false', () => {
        expect(component.vertical).toBe(false);
      });
    });

    describe('Vertical', () => {
      let alignment;
      beforeEach(() => {
        alignment = rootElement.queryAll(By.css('.radiobutton-group-validation > div'))[0];
        component.vertical = true;
        fixture.detectChanges();
      });
      it('class "vertical" should be true', () => {
        expect(alignment.classes['vertical']).toBe(true);
      });

      it('vertical should be true', () => {
        expect(component.vertical).toBe(true);
      });
    });
  });

  describe('Errorhandling', () => {
    describe('required but no item selected', () => {
      beforeEach(() => {
        component.items.forEach(element => element.selected = false);
        component.required = true;
        fixture.detectChanges();
        component.ngAfterContentInit();
      });

      it('errorActive should be true', () => {
        expect(component.errorActive).toBe(true);
      });

      it('validationErrorMessage should be "Obligatoriskt"', () => {
        expect(component.validationErrorMessage).toBe('Obligatoriskt');
      });
    });

    describe('more than one item selected', () => {
      beforeEach(() => {
        component.items.forEach(element => element.selected = true);
        fixture.detectChanges();
        component.ngAfterContentInit();
      });

      it('errorActive should be true', () => {
        expect(component.errorActive).toBe(true);
      });

      it('validationErrorMessage should be "Mer än ett val är aktivt"', () => {
        expect(component.validationErrorMessage).toBe('Mer än ett val är aktivt');
      });
    });

    describe('showValidation is false', () => {
      beforeEach(() => {
        component.items.forEach(element => element.selected = true);
        component.showValidation = false;
        fixture.detectChanges();
        component.ngAfterContentInit();
      });

      it('errorActive should be false', () => {
        expect(component.errorActive).toBe(false);
      });

      it('validationErrorMessage should be "Obligatoriskt"', () => {
        expect(component.validationErrorMessage).toBe('Obligatoriskt');
      });
    });
  });

  describe('Keyboard navigation', () => {
    let selectedOption: DebugElement[];
    let optionToSelect: DebugElement;
    let currentSelection: DebugElement;
    beforeEach(() => {
      component.ngAfterContentInit();
      fixture.detectChanges
      optionToSelect = rootElement.queryAll(By.css('vgr-radiobutton-item > div')).filter(x => x.nativeElement.innerText === 'One')[0];
      optionToSelect.triggerEventHandler('click', null);
      fixture.detectChanges();
      selectedOption = rootElement.queryAll(By.css('.radio-button--checked'));
    });

    it('the option is  selected', () => {
      expect(selectedOption[0].nativeElement.innerText).toEqual('One');
    });

    describe('and right arrow key is pressed', () => {
      beforeEach(() => {
        let currentSelection = rootElement.query(By.css('#radiogroup'));
        currentSelection.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

        fixture.detectChanges();
        selectedOption = rootElement.queryAll(By.css('.radio-button--checked'));
      });
      it('only one option is selected', () => {
        expect(selectedOption.length).toBe(1);
      });

      it('next option is selected (Two)', () => {
        currentSelection = rootElement.queryAll(By.css('.radio-button--checked'))[0];
        expect(currentSelection.nativeElement.innerText).toEqual('Two');
      });
      describe('and left arrow key is pressed', () => {

        beforeEach(() => {
          currentSelection = rootElement.query(By.css('#radiogroup'));
          currentSelection.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

          fixture.detectChanges();
          selectedOption = rootElement.queryAll(By.css('.radio-button--checked'));

        });
        it('only one option is selected', () => {
          expect(selectedOption.length).toBe(1);
        });

        it('previous option is selected (One), ', () => {
          currentSelection = rootElement.queryAll(By.css('.radio-button--checked'))[0];
          expect(currentSelection.nativeElement.innerText).toEqual('One');
        });
      });
    });
  });
});


