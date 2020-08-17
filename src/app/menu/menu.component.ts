import { Component } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    browserIsIE: boolean;
    htmlMenuMarkup = `
    <vgr-menu title="Meny">
        <vgr-menu-item link="#" text="Menu item 1"></vgr-menu-item>
        <vgr-menu-item link="#" text="Menu item 2"></vgr-menu-item>
        <vgr-menu-separator></vgr-menu-separator>
        <vgr-menu-item link="#" text="Menu item 3 med extra långt namn"></vgr-menu-item>
        <vgr-menu-item link="/menu" text="Menu item 4" notification="422"
            notificationTooltip="Detta är en tooltip" notificationColor="default"></vgr-menu-item>
        <vgr-menu-item link="#" text="Menu item 5" [disabled]="!browserIsIE"
            disabledTooltip="Endast tillgängligt i IE"></vgr-menu-item>
        <vgr-menu-item link="#" text="Menu item 6" collapsable="true"></vgr-menu-item>
        <vgr-menu-item link="#" text="Menu item 7" [disabled]="true"
            [disabledTooltip]="Alltid inaktivt" notification="12" notificationTooltip="Detta är ytterligare en tooltip"
        notificationColor="error"></vgr-menu-item>
        <vgr-menu-item link="121" text="Menu item with child link (Id)"></vgr-menu-item>
        <vgr-menu-separator></vgr-menu-separator>
        <vgr-submenu text="Submenu">
            <vgr-menu-item link="#" text="Sub menu item 1"></vgr-menu-item>
            <vgr-menu-item link="#" text=" Sub menu item 2 "></vgr-menu-item>
            <vgr-menu-item link="# " text="Sub menu item 3 "></vgr-menu-item>
        </vgr-submenu>
    </vgr-menu>`;

    constructor(htmlEncoder: HtmlEncodeService) {
        this.htmlMenuMarkup =
            htmlEncoder.prepareHighlightedSection(this.htmlMenuMarkup);
    }
}
