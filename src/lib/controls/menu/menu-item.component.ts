import { Input, Component, HostListener, Output, EventEmitter, ElementRef, Renderer, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemBase } from './menu-item-base';

@Component({
    selector: 'vgr-menu-item',
    templateUrl: './menu-item.component.html',
    providers: [{ provide: MenuItemBase, useExisting: forwardRef(() => MenuItemComponent) }]
})
export class MenuItemComponent extends MenuItemBase {
    @Input() text: string;
    @Input() link: string;
    @Input() disabled: boolean;
    @Input() disabledTooltip: string;
    @Input() notification: string;
    @Input() notificationColor: string;
    @Input() notificationTooltip: string;

    @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) { // enter & space - navigera
            event.preventDefault();
            this.router.navigate([this.link]);
        }
        if (event.keyCode === 36) { // Home
            this.goToFirst.emit();
            event.preventDefault();
        }
        if ((event.ctrlKey && event.keyCode === 33) || event.keyCode === 38) { // Ctrl + PageUp and Arrow Up
            this.goUp.emit();
            event.preventDefault();
        }
        if ((event.ctrlKey && event.keyCode === 34) || event.keyCode === 40) { // PageDown and Arrow Down
            this.goDown.emit();
            event.preventDefault();
        }
    }

    get notificationColorClass(): string {
        return 'notification--' + this.notificationColor;
    }

    get notificationText(): string {
        return this.notification && this.notification.length > 2 ? '!' : this.notification;
    }

    constructor(private router: Router, elementRef: ElementRef, renderer: Renderer) {
        super(elementRef, renderer);
    }
}
