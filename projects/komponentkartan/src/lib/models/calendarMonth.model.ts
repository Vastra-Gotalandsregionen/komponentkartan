import { ISelectableItem } from './selectableItem.model'

export interface ICalendarMonth extends ISelectableItem {
    date: Date;
    marked: boolean;
    isCurrentMonth: boolean;
}