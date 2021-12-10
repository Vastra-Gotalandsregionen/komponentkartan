import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


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

fdescribe('RadiobuttonGroupComponent', () => {
  let component: RadiobuttonGroupComponent;
  // let fixture: ComponentFixture<RadiobuttonGroupComponent>;
  let fixture: ComponentFixture<TestRadiogroupComponent>;
  let rootElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRadiogroupComponent, RadiobuttonGroupComponent, RadiobuttonItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // fixture = TestBed.createComponent(RadiobuttonGroupComponent);
    fixture = TestBed.createComponent(TestRadiogroupComponent);
    fixture.detectChanges();
    // component = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(RadiobuttonGroupComponent)).componentInstance;
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });

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
    let spyFirstOptionFocusable;
    beforeEach(() => {
      spyFirstOptionFocusable = spyOn(component, 'setFirstOptionAsFocusable').and.callThrough();
      component.items.forEach(element => element.selected = false);
      fixture.detectChanges();
      component.ngAfterContentInit();
      fixture.detectChanges();
    });

    it('firstOptionFocusable has been called',() => {
      expect(spyFirstOptionFocusable).toHaveBeenCalled();
    });

    it('firstItem has tabIndex = 0',() => {
      const firstItem = rootElement.queryAll(By.css('vgr-radiobutton-item .radio-button__icon'))[0];
      expect(firstItem.nativeElement.tabIndex).toBe(0);
    });

    it('other Items has tabIndex = -1',() => {
      const noTabIndexItems = rootElement.queryAll(By.css('vgr-radiobutton-item .radio-button__icon')).filter(x => x.nativeElement.tabIndex === -1);
      expect(noTabIndexItems.length).toBe(2);
    });
  });

  xdescribe('Item preselected', () => {
    let spyFirstOptionFocusable;
    let spysetSelected;
    beforeEach(fakeAsync(() => {
      spyFirstOptionFocusable = spyOn(component, 'setFirstOptionAsFocusable').and.callThrough();
      spysetSelected = spyOn(component, "setSelectedValue").and.callThrough();
      component.value = 'One';
      fixture.detectChanges();

      tick(400);
      fixture.detectChanges();
      //  fixture.whenStable().then(() => {
        component.ngAfterContentInit();
        tick(Infinity);

      //  });
      fixture.detectChanges();


    }));

    it('firstOptionFocusable not to have been called',() => {
      // fixture.whenStable().then(() => {
        expect(spyFirstOptionFocusable).not.toHaveBeenCalled();
      // })
    });

    it('setSelected to have been called', () => {
      expect(spysetSelected).toHaveBeenCalled();
    });

    it('preselected item to be selected', () => {

      console.log(component.items.get(0).value, component.items.get(0).selected)
      console.log(component.items.get(1).selected)
      console.log(component.items.get(2).selected)
      // expect(component.items.single(x => x.value === component.value)    selected).toBe(true)

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

    });

  describe('more than one item selected', () => {

    });

  });

  fdescribe('Keyboard navigation', () => {
    let selectedOption: DebugElement[];
    let optionToSelect: DebugElement;
    let currentSelection: DebugElement;
    let spySetSelected;
    beforeEach(() => {
      spySetSelected = spyOn(component, "setSelectedValue").and.callThrough();
      component.ngAfterContentInit();
      fixture.detectChanges
      optionToSelect = rootElement.queryAll(By.css('vgr-radiobutton-item > div')).filter(x => x.nativeElement.innerText === 'One')[0];
      optionToSelect.triggerEventHandler('click', null);
      fixture.detectChanges();
      selectedOption = rootElement.queryAll(By.css('.radio-button--checked'));
    });

    it('spy to have been called', () => {
      expect(spySetSelected).toHaveBeenCalled();
    })
    it('the option is  selected', () => {
      expect(selectedOption[0].nativeElement.innerText).toEqual('One');
    });

    describe('and right arrow key is pressed', () => {
      beforeEach(() => {
        currentSelection = rootElement.query(By.css('.radio-button--checked'));
        console.log(currentSelection)
          currentSelection.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));


          fixture.detectChanges();
          selectedOption = rootElement.queryAll(By.css('.radio-button--checked'));
          console.log(selectedOption[0].nativeElement.innerHTML)
      });
      it('only one option is selected', () => {
          expect(selectedOption.length).toBe(1);
      });

      fit('next option is selected (Two)', () => {
          currentSelection = rootElement.queryAll(By.css('.radio-button--checked'))[0];
          expect(currentSelection.nativeElement.innerText).toEqual('Two');
      });
      describe('and left arrow key is pressed', () => {

          beforeEach(() => {
              currentSelection = rootElement.query(By.css('.radio-button--checked'));
              currentSelection.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

              fixture.detectChanges();
              selectedOption = rootElement.queryAll(By.css('.radio-button--checked .radio-button__icon'));

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
