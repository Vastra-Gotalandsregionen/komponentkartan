import { Input, Component, HostListener, ElementRef, Renderer, forwardRef, HostBinding, AfterViewInit, ViewChild } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { MenuItemBase } from './menu-item-base';

@Component({
    selector: 'vgr-menu-item',
    templateUrl: './menu-item.component.html',
    providers: [{ provide: MenuItemBase, useExisting: forwardRef(() => MenuItemComponent) }]
})
export class MenuItemComponent extends MenuItemBase implements AfterViewInit {
    @Input() text: string;
    @Input() link: string;
    @Input() disabled = false;
    @Input() disabledTooltip: string;
    @Input() notification: string;
    @Input() notificationColor: string;
    @Input() notificationTooltip: string;
    @Input() isInternalLink: boolean;
    @HostBinding('attr.role') role = 'menuitem';
    @HostBinding('attr.aria-disabled') ariaDisabled;
    @ViewChild('menuitem') menuitem: ElementRef;

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {

        if (event.keyCode === 13 || event.keyCode === 32) { // Enter, Space
            if (this.disabled) {

                event.cancelBubble = true;
                event.preventDefault();
                return;
            }
            this.router.navigate([this.link]);
        }
        if (event.keyCode === 36) { // Home
            this.home.emit();
        }
        if (event.keyCode === 35) { // End
            this.end.emit();
        }
        if (event.keyCode === 38) { // Arrow Up
            this.arrowUp.emit();
        }
        if (event.keyCode === 40) { // Arrow Down
            this.arrowDown.emit();
        }
        if (event.keyCode === 27) { // Escape
            this.escape.emit();
        }
        if (event.keyCode === 9) { // Tab
            this.tab.emit();
        }

        event.cancelBubble = true;
        event.preventDefault();
    }

    get notificationColorClass(): string {
        return 'notification--' + this.notificationColor;
    }

    get notificationText(): string {
        return this.notification && this.notification.length > 2 ? '!' : this.notification;
    }

    constructor(private router: Router, private renderer: Renderer) {
        super();
    }

    setFocus(movingUp: boolean = false) {
        this.renderer.invokeElementMethod(this.menuitem.nativeElement, 'focus');
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.ariaDisabled = this.disabled;
        }, 25);
    }
}
