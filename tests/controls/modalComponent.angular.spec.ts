
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalPlaceholderComponent } from '../../component-package/controls/modal/modal.component';
import { ButtonComponent } from '../../component-package/controls/button/button.component';
import { ModalService, ModalConfiguration, ModalButtonConfiguration } from '../../component-package/services/modalService';

describe('ModalPlaceholderComponent', () => {
    let component: ModalPlaceholderComponent;
    let fixture: ComponentFixture<ModalPlaceholderComponent>;
    let rootElement: DebugElement;
    let modalService: ModalService;
    let selectedButton: string;
    beforeEach((done) => {
        modalService = new ModalService();
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [ModalPlaceholderComponent, ButtonComponent],
            imports: [CommonModule, FormsModule],
            providers: [{ provide: ModalService, useValue: modalService }]
        });

        TestBed.overrideComponent(ModalPlaceholderComponent, {
            set: {
                templateUrl: 'modal.component.html'
            }
        });


        TestBed.overrideComponent(ButtonComponent, {
            set: {
                templateUrl: 'button.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ModalPlaceholderComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When component is initialized', () => {
        it('modal is not open', () => {
            expect(component.isOpen).toBe(false);
        });
    });

    describe('When a two-button modal is opened', () => {
        beforeEach(() => {
            modalService.openDialog('Title', 'Message',
                new ModalButtonConfiguration('Button1', () => selectedButton = 'Button1'),
                new ModalButtonConfiguration('Button2', () => selectedButton = 'Button2'));
            fixture.detectChanges();
        });
        it('modal is open', () => {
            expect(component.isOpen).toBe(true);
        });
        it('modal is visible', () => {
            var openModals = rootElement.queryAll(By.css('.vgr-modal--open'));
            expect(openModals.length).toBe(1);
        });
        describe('and button 2 is clicked', () => {
            beforeEach(() => {
                var buttons = rootElement.queryAll(By.css('.button--secondary'));
                buttons[1].triggerEventHandler('click', {});
            });
            it('modal is closed', () => {
                expect(component.isOpen).toBe(false);
            });
            it('button 2 callback is called', () => {
                expect(selectedButton).toBe('Button2');
            });
        });
    });
});