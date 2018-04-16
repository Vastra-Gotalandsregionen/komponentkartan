import { Input, Component, HostListener, Output, EventEmitter, ElementRef, Renderer, forwardRef, HostBinding, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemBase } from './menu-item-base';

@Component({
    selector: 'vgr-menu-item',
    templateUrl: './menu-item.component.html',
    providers: [{ provide: MenuItemBase, useExisting: forwardRef(() => MenuItemComponent) }]
})
export class MenuItemComponent extends MenuItemBase implements AfterViewInit {
    @Input() text: string;
    @Input() link: string;
    @Input() disabled: boolean = false;
    @Input() disabledTooltip: string;
    @Input() notification: string;
    @Input() notificationColor: string;
    @Input() notificationTooltip: string;
    @HostBinding('attr.role') role = 'menuitem';
    @HostBinding('attr.aria-disabled') ariaDisabled;

    @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) { // enter & space - navigera
            event.preventDefault();
            //funkar inte med denna då eventet går på submenu istället....
            if (this.disabled)
                return;

            this.router.navigate([this.link]);
        }
        if (event.keyCode === 36) { // Home
            this.goToFirst.emit();
            event.cancelBubble = true;
            event.preventDefault();
        }
        if (event.keyCode === 38) { // Arrow Up
            this.goUp.emit();
            event.cancelBubble = true;
            event.preventDefault();
        }
        if (event.keyCode === 40) {
            this.goDown.emit(); // Arrow Down
            event.cancelBubble = true;
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

    ngAfterViewInit() {
        setTimeout(() => {
            this.ariaDisabled = this.disabled;
        }, 25);

    }
}
