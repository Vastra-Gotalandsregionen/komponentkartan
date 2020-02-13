import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleValueContainerComponent } from './titleValueContainer.component';

describe('[ActionPanelComponent - Angular]', () => {
    let component: TitleValueContainerComponent;
    let fixture: ComponentFixture<TitleValueContainerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ TitleValueContainerComponent ]
        });

        fixture = TestBed.createComponent(TitleValueContainerComponent);
        component = fixture.componentInstance;
    });

    describe('When creating component', () => {
        it('it is created', () => {
            expect(component).toBeTruthy();
        });
        it('set to 1 in width', () => {
            expect(component.width).toBe(1);
        });
    });
});
