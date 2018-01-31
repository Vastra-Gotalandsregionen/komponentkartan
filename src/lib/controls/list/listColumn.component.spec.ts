import { ListColumnComponent } from '../../controls/list/list-column.component';
import { ListColumnHeaderComponent } from '../../controls/list/list-column-header.component';
describe('[ListColumnComponent]', () => {
    let component: ListColumnComponent;

    beforeEach(() => {
        component = new ListColumnComponent();
    });

    describe('When set width is called', () => {
        beforeEach(() => {
            component.setWidth(20);
        });
        it('Width is set', () => {
            expect(component.width).toEqual(20);
        });

    });

    describe('When getClasses is called', () => {
        describe('And width  and align is not set', () => {
            it('It returns the default classes', () => {
                expect(component.classes).toEqual('list__column flex-column flex-column--1 column--align-left');
            });
        });
        describe('And width is set', () => {
            beforeEach(() => {
                component.setWidth(20);
            });
            it('It returns classes updated with width', () => {
                expect(component.classes).toEqual('list__column flex-column flex-column--20 column--align-left');
            });
        });

        describe('And align is set', () => {
            beforeEach(() => {
                component.setAlignment('center');
            });
            it('It returns classes updated with width', () => {
                expect(component.classes).toEqual('list__column flex-column flex-column--1 column--align-center');
            });
        });
    });

});

