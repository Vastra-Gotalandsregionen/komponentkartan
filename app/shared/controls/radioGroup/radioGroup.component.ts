import { Component, Input, EventEmitter, Output, AfterViewInit, OnChanges } from "@angular/core";
import { ISelectableItem } from "../../models/selectableItem.model";

@Component({
    selector: "radio-group",
    templateUrl: "app/shared/controls/radioGroup/radioGroup.component.html",
    host: { 'class': 'radio-group', 'role': 'radiogroup' }
})
export class RadioGroupComponent implements OnChanges {
    @Input() options: ISelectableItem[];
    @Input() name: string;
    @Input() noSelection: boolean;
    @Output() selectedChanged: EventEmitter<ISelectableItem> = new EventEmitter<ISelectableItem>();

    constructor() {
        this.name = "group";
    }

    ngOnChanges() {
        if (!this.noSelection && this.options && this.options.length > 0) {
            let preSelectedOptions = this.options.filter(x => x.selected);
            if (preSelectedOptions.length > 0)
                this.selectOption(preSelectedOptions[0]);
            else {
                let enabledOptions = this.options.filter(x => !x.disabled)
                this.selectOption(enabledOptions[0]);
            }
        }
    }

    optionClicked(option: ISelectableItem) {
        if (option.disabled || option.selected)
            return;

        console.log(option);
        this.selectOption(option);
    }

    keyDown(event: KeyboardEvent, option: ISelectableItem): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.optionClicked(option);
            event.preventDefault();
        }
    }

    private selectOption(option: ISelectableItem) {
        option.selected = true;
        this.options.filter(x => x !== option).forEach(o => {
            o.selected = false;
        });

        this.selectedChanged.emit(option);
    }
}
