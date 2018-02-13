import { DropdownComponent } from './dropdown.component';
import { DropdownItem } from '../../models/dropdownItem.model'

describe('[DropdownComponent]', () => {
    let component: DropdownComponent;
    let component2: DropdownComponent;
    let source: DropdownItem<string>[] = [{ displayName: 'Kalle', value: '1', selected: true, marked: false }, { displayName: 'Eva', value: '2', marked: false }, { displayName: 'Anna', value: '3', marked: false }];

    beforeEach(() => {
        component = new DropdownComponent(null, null, null);
        component2 = new DropdownComponent(null, null, null);
    });


    describe('When two components has same source,', () => {
        beforeEach(() => {
            component.items = source;
            component2.items = source;
        });

        it('component1 has three items', () => {
            expect(component.items.length).toBe(3);
        });
        it('Kalle is selected on component1', () => {
            expect(component.selectedItem.displayName).toBe('Kalle');
        });
        it('component2 has three items', () => {
            expect(component2.items.length).toBe(3);
        });
        it('Kalle is selected on component2', () => {
            expect(component2.selectedItem.displayName).toBe('Kalle');
        });


        describe('and component1 selects second option', () => {
            beforeEach(() => {
                component.selectItem(source[1]);
            });
            it('Eva is selected on component1', () => {
                expect(component.selectedItem.displayName).toBe('Eva');
            });
            it('Eva is marked  on component1', () => {
                expect(component.selectedItem.marked).toBe(true);
            });
            it('Kalle is selected on component2', () => {
                expect(component2.selectedItem.displayName).toBe('Kalle');
            });
            it('Eva is mot marked  on component2', () => {
                expect(component2.items[1].marked).toBe(false);
            });

        });
    });


});

