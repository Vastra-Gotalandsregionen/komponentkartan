import { Input, Component, HostListener, ElementRef, forwardRef, HostBinding, AfterViewInit, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemBaseDirective } from './menu-item-base';

@Component({
    selector: 'vgr-menu-item',
    templateUrl: './menu-item.component.html',
    providers: [{ provide: MenuItemBaseDirective, useExisting: forwardRef(() => MenuItemComponent) }]
})
export class MenuItemComponent extends MenuItemBaseDirective implements AfterViewInit {
    @Input() text: string;
    @Input() link: string;
    @Output() action = new EventEmitter<MouseEvent | KeyboardEvent>();
    @Input() disabled = false;
    @Input() disabledTooltip: string;
    @Input() notification: string;
    @Input() notificationColor: string;
    @Input() notificationTooltip: string;
    @Input() isInternalLink = true;
    @HostBinding('attr.role') role = 'menuitem';
    @HostBinding('attr.aria-disabled') ariaDisabled;
    @ViewChild('menuitem') menuitem: ElementRef;

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {

        if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
            if (this.disabled) {

                event.stopPropagation();
                event.preventDefault();
                return;
            }

            if (this.link) {
                this.isInternalLink ? this.router.navigate([this.link]) : this.onExternalLink();
              setTimeout(() => {
                this.renderer.selectRootElement('#page-header-focus', true).focus();
              }, 100);
            } else if (this.action) {
                this.onAction(event);
            }

        }
        if (event.key === 'Home') {
            this.home.emit();
        }
        if (event.key === 'End') {
            this.end.emit();
        }
        if (event.key === 'ArrowUp' || event.key === 'Up') {
            this.arrowUp.emit();
        }
        if (event.key === 'ArrowDown' || event.key === 'Down') {
            this.arrowDown.emit();
        }
        if (event.key === 'Escape' || event.key === 'Esc') {
            this.escape.emit();
        }
        if (event.key === 'Tab') {
            this.tab.emit();
        }

        if ([' ', 'Spacebar', 'Enter', 'Home', 'End', 'ArrowDown', 'Down', 'ArrowUp', 'Up', 'Escape', 'Esc'].indexOf(event.key) > -1) {
            event.stopPropagation();
            event.preventDefault();
        }

    }

    get notificationColorClass(): string {
        return 'notification--' + this.notificationColor;
    }

    get notificationText(): string {
        return this.notification && this.notification.length > 2 ? '!' : this.notification;
    }

    constructor(private router: Router, private renderer: Renderer2) {
        super();
    }

    setFocus(movingUp: boolean = false) {
        var pageHeaderHasFocus = (document.activeElement === document.getElementById('page-header-focus'));
        if (!pageHeaderHasFocus) {
            this.menuitem.nativeElement.focus();
        }

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.ariaDisabled = this.disabled;
        }, 25);
    }

    onExternalLink() {
        if (this.link) {
            return window.open(this.link, '_blank');
        }
    }

    onAction(event: MouseEvent | KeyboardEvent) {
        this.action.emit(event);
    }

    public focus() {
        this.setFocus();
    }
}
