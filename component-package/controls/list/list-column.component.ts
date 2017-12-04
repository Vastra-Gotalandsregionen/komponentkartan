import { Component, HostBinding, Input, Output, EventEmitter, SimpleChanges, DoCheck, OnChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { ListColumnHeaderComponent } from './list-column-header.component';

@Component({
    templateUrl: './list-column.component.html',
    moduleId: module.id,
    selector: 'vgr-list-column',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListColumnComponent implements DoCheck, OnChanges {
    @HostBinding('class', )
    get classes(): string {
        return 'list__column flex-column ' + this.getColumnWidthClass() + ' ' + this.getAlignClass();
    }
    @Input() text: string;
    width: number;
    align: string;
    pendingWidth: number;
    pendingAlign: string;

    constructor(private changeDetector: ChangeDetectorRef) {

    }

    private getColumnWidthClass(): string {
        return 'flex-column--' + (this.width ? this.width : 1);
    }

    private getAlignClass(): string {
        return 'column--align-' + (this.align ? this.align : 'left');
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    }

    ngDoCheck() {
        // För att undvika att man får Expression Changed after it was checked, sätts width här
        // Notera att DoCheck åsidosätter den normala ChangeDetection som görs.
        // Om denna komponent får mer beteende och state i framtiden kan lösningen behöva göras om.
        // Om värdet på text ändras slår det igenom, så sådan ChangeDetection är intakt.
        if (this.pendingWidth !== this.width) {
            console.log('Apply pending width to ' + this.pendingWidth);
            this.width = this.pendingWidth;
        }

        if (this.pendingAlign !== this.align) {
            console.log('Apply pending align to ' + this.pendingAlign);
            this.align = this.pendingAlign;
        }
    }

    setWidth(width: number) {
        // För att undvika att man får Expression Changed after it was checked, lagras värdet undan som "pending".
        // Det sätts sedan i DoCheck
        console.log('Set pending width to ' + width);
        this.pendingWidth = width;
        this.changeDetector.markForCheck();

    }
    setAlignment(alignment: string) {
        // För att undvika att man får Expression Changed after it was checked, lagras värdet undan som "pending".
        // Det sätts sedan i DoCheck
        console.log('Set pending align to ' + alignment);
        this.pendingAlign = alignment;
        this.changeDetector.markForCheck();

    }
}

