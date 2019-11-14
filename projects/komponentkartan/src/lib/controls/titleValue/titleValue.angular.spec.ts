
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '../icon/icon.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TitleValueLayoutComponent } from './titleValueLayout.component';
import { TitleValueComponent } from './titleValue.component';
import { TitleValueContainerComponent } from './titleValueContainer/titleValueContainer.component';
import { TitleValueHeadingComponent } from './titleValueHeading/titleValueHeading.component';
import { InputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { ErrorMessagePipe } from '../../pipes/errorMessagePipe';
import { TruncatePipe } from '../../pipes/truncatePipe';


@Component({
    selector: 'vgr-title-value-component',
    template: `
      <vgr-title-value-layout>
        <vgr-title-value>
          <vgr-title-value-heading>Bruttobelopp</vgr-title-value-heading>
          <vgr-title-value-container>
            <vgr-input [value]="10000" [suffix]="'kr'" [alignRight]="true"></vgr-input>
          </vgr-title-value-container>
        </vgr-title-value>
        <vgr-title-value>
          <vgr-title-value-heading>Skattesats</vgr-title-value-heading>
          <vgr-title-value-container>
            <vgr-input [value]="32" [suffix]="'%'" [alignRight]="true"></vgr-input>
          </vgr-title-value-container>
        </vgr-title-value>
        <vgr-title-value>
          <vgr-title-value-heading>Nettobelopp</vgr-title-value-heading>
          <vgr-title-value-container>
            <vgr-input [value]="32" [suffix]="'kr'" [alignRight]="true"></vgr-input>
          </vgr-title-value-container>
        </vgr-title-value>
      </vgr-title-value-layout>
      `
})
class TestTextValueComponent { }


describe('[TitleValueComponent - test]', () => {
    let component: TitleValueLayoutComponent;
    let fixture: ComponentFixture<TestTextValueComponent>;

    let rootElement: HTMLElement;
    let debugElement: DebugElement;

    beforeEach((done) => {
        TestBed.configureTestingModule({
            declarations: [
                TestTextValueComponent,
                TitleValueLayoutComponent,
                TitleValueComponent,
                TitleValueContainerComponent,
                TitleValueHeadingComponent,
                InputComponent,
                IconComponent,
                ErrorMessagePipe,
                TruncatePipe
            ],
            imports: [
                FormsModule,
                CommonModule,
                BrowserAnimationsModule,
                BrowserDynamicTestingModule,
                NoopAnimationsModule,
                FontAwesomeModule,
                IconModule
            ],
        });
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TestTextValueComponent);
            component = fixture.debugElement.children[0].componentInstance;
            debugElement = fixture.debugElement;
            rootElement = fixture.debugElement.nativeElement;

            fixture.detectChanges();
            done();
        });
    });
    describe('When creating component', () => {
        it('it is created', () => {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });
    });

});
