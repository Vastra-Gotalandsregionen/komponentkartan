export interface Calendar {
    date: Date;
    items: CalendarItem[][];
    previous: () => void;
    next: () => void;
    farPrevious: () => void;
    farNext: () => void;
    zoomOut: () => void;
}

export interface CalendarItem {
    date: Date;
    selected: boolean;
    disabled: boolean;
    isMinZoom: boolean;
}

export enum DatepickerZoomLevel {
    Days = 1,
    Months = 2,
    Years = 3
}
