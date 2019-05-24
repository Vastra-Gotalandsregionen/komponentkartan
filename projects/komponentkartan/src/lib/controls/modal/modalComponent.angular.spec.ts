
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { FormsModule } from '@angular/forms';
import { Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalPlaceholderComponent } from '../../controls/modal/modal.component';
import { ButtonComponent } from '../../controls/button/button.component';
import { ModalService } from '../../services/modalService';

describe('ModalPlaceholderComponent', () => {
    let component: ModalPlaceholderComponent;
    let fixture: ComponentFixture<ModalPlaceholderComponent>;
    let modalService: ModalService;
    beforeEach((done) => {
        modalService = new ModalService();
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [ModalPlaceholderComponent, ButtonComponent],
            imports: [CommonModule, FormsModule],
            providers: [{
                provide: ModalService, useValue: modalService
            },
            { provide: Renderer2 }
            ],
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ModalPlaceholderComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            done();
        });
    });
    describe('When component is initialized', () => {
        it('modal is not open', () => {
            expect(component.isOpen).toBe(false);
        });
    });
});
