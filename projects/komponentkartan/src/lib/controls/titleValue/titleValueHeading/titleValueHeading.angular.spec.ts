import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleValueHeadingComponent } from './titleValueHeading.component';


describe('[ActionPanelComponent - Angular]', () => {
    let component: TitleValueHeadingComponent;
    let fixture: ComponentFixture<TitleValueHeadingComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ TitleValueHeadingComponent ]
        });

        fixture = TestBed.createComponent(TitleValueHeadingComponent);
        component = fixture.componentInstance;
    });

    describe('When creating component', () => {
        it('it is created', () => {
            expect(component).toBeTruthy();
        });
        it('set to 1 in width', () =>{
            expect(component.width).toBe(1);
        });
    });
});
