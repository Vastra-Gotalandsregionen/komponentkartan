﻿import { DropdownItemToSelectedTextPipe } from '../pipes/dropdownItemToSelectedTextPipe';
import { IDropdownItem } from '../models/dropdownItem.model';

describe('DropdownItemToSelectedTextPipe', () => {
    const dropdownPipe = new DropdownItemToSelectedTextPipe();
    describe('When displayNameWhenSelected is undefined', () => {
        it('display name is returned', () => {
            const result = dropdownPipe.transform(
                { displayName: 'DisplayName', displayNameWhenSelected: undefined } as IDropdownItem);

            expect(result).toBe('DisplayName');
        });
    });
    describe('When displayNameWhenSelected is defined', () => {
        it('displayNameWhenSelected is returned', () => {
            const result = dropdownPipe.transform(
                { displayName: 'DisplayName', displayNameWhenSelected: 'When selected' } as IDropdownItem);

            expect(result).toBe('When selected');
        });
    });
    describe('When neither displayNameWhenSelected nor displayName is defined', () => {
        it('empty string is returned', () => {
            const result = dropdownPipe.transform(
                { displayName: undefined, displayNameWhenSelected: undefined } as IDropdownItem);

            expect(result).toBe('');
        });
    });
});
