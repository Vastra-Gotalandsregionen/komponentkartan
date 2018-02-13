import { Component, OnInit } from '@angular/core';
import { IMenu, IMenuItem, IMenuGroup } from '@komponentkartan/index';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    exampleCodeSimpleMeny = ` this.menu = [
    {
        title: 'En nivå',
        groups: [
            {
                order: '0',
                menuItems: [
                    { title: 'Sida 1', url: '/1' } as IMenuItem,
                    { title: 'Sida 2', url: '/2' } as IMenuItem,
                    { title: 'Sida 3', url: '/3' } as IMenuItem
                ] as IMenuItem[]
            } as IMenuGroup
        ] as IMenuGroup[]
    } as IMenu,
] as IMenu[];`;

    exampleCodeSimpleMenyWithChildren = `this.menu = [
    {
        title: 'Med undernivå',
        groups: [
            {
                order: '0',
                menuItems: [
                    { title: 'Sida 1', url: '/1' } as IMenuItem,
                    { title: 'Sida 2', url: '/2' } as IMenuItem,
                    {
                        title: 'Sida 3', url: '/3', menuItems: [
                            { title: 'Undersida 1', url: '/3.1' } as IMenuItem,
                            { title: 'Undersida 2', url: '/3.2' } as IMenuItem,
                            { title: 'Undersida 3', url: '/3.3' } as IMenuItem,
                        ] ]

            } as IMenuGroup
        ] as IMenuGroup[]
    } as IMenu,
] as IMenu[];`;

    exampleCodeSimpleMenyWithGroups = `this.menu = [
        {
            title: 'Med gruppering',
            groups: [
                {
                    menuItems: [
                        { title: 'Grupp 1 Sida 1', url: '/1' } as IMenuItem,
                        { title: 'Grupp 1 Sida 2', url: '/2' } as IMenuItem,
                        {
                            title: 'Grupp 1 Sida 3', url: '/3', menuItems: [
                                { title: 'Grupp 1 Undersida 1', url: '/3.1' } as IMenuItem,
                                { title: 'Grupp 1 Undersida 2', url: '/3.2' } as IMenuItem,
                                { title: 'Grupp 1 Undersida 3', url: '/3.3' } as IMenuItem
                            ]
                        } as IMenuItem
                    ]
                } as IMenuGroup,
                {
                    menuItems: [
                        { title: 'Grupp 2 Sida 4', url: '/4' } as IMenuItem,
                        { title: 'Grupp 2 Sida 5', url: '/5' } as IMenuItem,
                        {
                            title: 'Grupp 2 Sida 6', url: '/6', menuItems: [
                                { title: 'Grupp 2 Undersida 1', url: '/6.1' } as IMenuItem,
                                { title: 'Grupp 1 Undersida 2', url: '/6.2' } as IMenuItem,
                                { title: 'Grupp 1 Undersida 3', url: '/6.3' } as IMenuItem
                            ]
                        } as IMenuItem
                    ]
                } as IMenuGroup
            ] as IMenuGroup[]
        } as IMenu,
    ] as IMenu[];`;

    exampleCodeSimpleMenyMarkup: string;
    exampleCodeSimpleMenyWithChildrenMarkup: string;
    exampleCodeSimpleMenyWithGroupsMarkup: string;

    constructor(htmlEncoder: HtmlEncodeService) {
        this.exampleCodeSimpleMenyMarkup =
            htmlEncoder.prepareHighlightedSection(this.exampleCodeSimpleMeny, 'typescript');
        this.exampleCodeSimpleMenyWithChildrenMarkup =
            htmlEncoder.prepareHighlightedSection(this.exampleCodeSimpleMenyWithChildren, 'typescript');
        this.exampleCodeSimpleMenyWithGroupsMarkup =
            htmlEncoder.prepareHighlightedSection(this.exampleCodeSimpleMenyWithGroups, 'typescript');
    }

    ngOnInit() {
    }

}
