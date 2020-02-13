import { RadioGroupComponent } from './radioGroup.component';
import { SelectableItem } from '../../models/selectableItem.model';


describe('[RadioGroupComponent]', () => {
    let component: RadioGroupComponent;
    let component2: RadioGroupComponent;
    const source: SelectableItem<string>[] = [{ displayName: 'Kalle', value: '1', selected: true }, { displayName: 'Eva', value: '2' }, { displayName: 'Anna', value: '3' }];

    beforeEach(() => {
        component = new RadioGroupComponent(null, null, null);
        component2 = new RadioGroupComponent(null, null, null);
    });


    describe('When two components has same source,', () => {
        beforeEach(() => {
            component.options = source;
            component2.options = source;
        });

        it('component1 has three items', () => {
            expect(component.radiogroupItems.length).toBe(3);
        });
        it('Kalle is selected on component1', () => {
            expect(component.radiogroupItems[0].selected).toBe(true);
        });
        it('component2 has three items', () => {
            expect(component2.radiogroupItems.length).toBe(3);
        });
        it('Kalle is selected on component2', () => {
            expect(component2.radiogroupItems[0].selected).toBe(true);
        });


        describe('and component1 selects second option', () => {
            beforeEach(() => {
                component.optionClicked(component.radiogroupItems[1]);
            });
            it('Kalle is not selected on component1', () => {
                expect(component.radiogroupItems[0].selected).toBe(false);
            });
            it('Eva is selected on component1', () => {
                expect(component.radiogroupItems[1].selected).toBe(true);
            });
            it('Kalle is still selected on component2', () => {
                expect(component2.radiogroupItems[0].selected).toBe(true);
            });

        });
    });


});

