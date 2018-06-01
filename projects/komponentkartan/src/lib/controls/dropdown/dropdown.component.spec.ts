import { DropdownComponent } from './dropdown.component';
import { DropdownItem } from '../../models/dropdownItem.model';

describe('[DropdownComponent]', () => {
    let component: DropdownComponent;
    let component2: DropdownComponent;
    const source: DropdownItem<string>[] = [{ displayName: 'Kalle', value: '1', selected: true, marked: false }, { displayName: 'Eva', value: '2', marked: false }, { displayName: 'Anna', value: '3', marked: false }];

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

    describe('the component is resetted', () => {
        beforeEach(() => {
            component.items = source;
            component.writeValue(null);
        });
        it('Eva is selected on component1', () => {
            component.items.forEach(i => {
                expect(i.selected).toBe(false);
                expect(i.marked).toBe(false);
            });
        });
    });

    describe('Option 2 is selected', () => {
        beforeEach(() => {
            component.items = source;
            component.selectItem({ displayName: 'Eva', value: '2' });
            component.writeValue('2');
        });
        it('Option 2 (Eva) is selected and marked', () => {
            component.items.filter(i => i.value === '2').forEach(i => {
                expect(i.selected).toBe(true);
                expect(i.marked).toBe(true);
            });
        });
        it('other options are is unselected and unmarked', () => {
            component.items.filter(i => i.value !== '2').forEach(i => {
                expect(i.selected).toBe(false);
                expect(i.marked).toBe(false);
            });
        });
    });
});

