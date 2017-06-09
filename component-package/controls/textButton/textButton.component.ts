import { Component, Input, EventEmitter, Output, OnChanges } from "@angular/core";

@Component({
    selector: "vgr-text-button",
    templateUrl: "component-package/controls/textButton/textButton.component.html"
})
export class TextButtonComponent implements OnChanges {
    @Input() disabled: boolean;
    @Input() secondary: boolean;
    lastDisabledStatus: boolean;
    reenabled: boolean;
    @Output() buttonClick = new EventEmitter<string>();

    buttonClicked(): void {
        if (!this.disabled) {
            this.buttonClick.emit();
        }
    }

    ngOnChanges() {
        this.reenabled = this.lastDisabledStatus === true && this.disabled === false;

        this.lastDisabledStatus = this.disabled;

    }


    keyPressed(event: KeyboardEvent): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.buttonClicked();
        }
    }
}