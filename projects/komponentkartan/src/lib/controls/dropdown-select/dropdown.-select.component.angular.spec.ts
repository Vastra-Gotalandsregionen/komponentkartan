import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { DropdownSelectComponent } from './dropdown-select.component';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { TruncatePipe } from '../../pipes/truncatePipe';

@Component({
  selector: 'vgr-filter-textbox',
  template: '<div>Mock</div>'
})
class MockFilterTextboxComponent {}

@Component({
  selector: 'perfect-scrollbar',
  template: '<ng-content></ng-content>'
})
class MockPerfectScrollbarComponent {
  @Input() config;
}

describe('[DropdownSelectComponent - Angular]', () => {
  let component: DropdownSelectComponent;
  let fixture: ComponentFixture<DropdownSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropdownSelectComponent,
        ButtonComponent,
        MockFilterTextboxComponent,
        MockPerfectScrollbarComponent,
        TruncatePipe
      ]
    });
    fixture = TestBed.createComponent(DropdownSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
